const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const database = require("../../Schemas/Infractions");
const ms = require("ms");
const translation = require("../../Structures/Language/local");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a user who has violated a rule")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false)
    .addUserOption((options) =>
      options
        .setName("target")
        .setDescription("Select the target member")
        .setRequired(true)
    )
    .addStringOption((options) =>
      options
        .setName("duration")
        .setDescription("Provide a duration for this Timeout (1m,1h,1d)")
        .setRequired(true)
    )
    .addStringOption((options) =>
      options
        .setName("reason")
        .setDescription("Provide a reason for this timeout")
        .setMaxLength(512)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { options, guild, member } = interaction;
    const target = options.getMember("target");
    const duration = options.getString("duration");
    const reason = options.getString("reason") || translation.globalNoReason;

    const errorsArray = [];
    const errorsEmbed = new EmbedBuilder()
      .setAuthor({ name: `${translation.timeoutErrorEmbedAuthor}` })
      .setColor("Red");

    if (!target)
      return interaction.reply({
        embeds: [
          errorsEmbed.setDescription(
            `${translation.timeoutErrorEmbedUserLeft}`
          ),
        ],
        ephemeral: true,
      });

    if (!ms(duration) || ms(duration) > ms("28d"))
      errorsArray.push(`${translation.timeoutErrorEmbedTimeLimit}`);

    if (!target.manageable || !target.moderatable)
      errorsArray.push(`${translation.timeoutErrorEmbedBotLowRole}`);

    if (member.roles.highest.posistion < target.roles.highest.posistion)
      errorsArray.push(`${translation.timeoutErrorEmbedHigherRole}`);

    if (errorsArray.length)
      return interaction.reply({
        embeds: [errorsEmbed.setDescription(errorsArray.join("\n"))],
        ephemeral: true,
      });

    target.timeout(ms(duration), reason).catch((err) => {
      interaction.reply({
        embeds: [errorsEmbed.setDescription(`${translation.timeoutErrorText}`)],
      });
      return console.log("Error occured in cmdTimout.js", err);
    });

    const newInfractionObject = {
      IssuerID: member.id,
      IssuerTag: member.user.tag,
      Reason: reason,
      Date: Date.now(),
    };

    let userData = await database.findOne({ Guild: guild.id, User: target.id });
    if (!userData)
      userData = await database.create({
        Guild: guild.id,
        User: target.id,
        Infractions: [newInfractionObject],
      });
    else
      userData.Infractions.push(newInfractionObject) && (await userData.save());

    const timeoutTextReplaces = {
      target: target,
      member: member,
      reason: reason,
      duration: ms(ms(duration), {
        long: true,
      }),
      totalPoints: userData.Infractions.length,
    };

    let replacedText = translation.timeoutSuccessEmbedDesc;
    for (const key in timeoutTextReplaces) {
      replacedText = replacedText.replace(
        new RegExp(`\\$\\{${key}\\}`, "g"),
        timeoutTextReplaces[key]
      );
    }

    const successEmbed = new EmbedBuilder()
      .setAuthor({
        name: `${translation.timeoutSuccessEmbedAuthor}`,
        iconURL: guild.iconURL(),
      })
      .setColor("Gold")
      .setDescription([replacedText].join("\n"))
      .addFields({
        name: `${translation.timeoutSuccesFieldReason}`,
        value: `${reason}`,
        inline: false,
      })
      .addFields(
        {
          name: `${translation.timeoutSuccesFieldDuration}`,
          value: `**${ms(ms(duration), {
            long: true,
          })}**`,
          inline: true,
        },
        {
          name: `${translation.timeoutSuccesFieldTotal}`,
          value: `**${userData.Infractions.length} points**`,
          inline: true,
        }
      );

    return interaction.reply({ embeds: [successEmbed] });
  },
};
