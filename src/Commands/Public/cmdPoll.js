const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const translations = require("../../Structures/Language/local");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Create a poll")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((options) =>
      options
        .setName("question")
        .setDescription("Provide the question of the poll")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const pollQuestion = interaction.options.getString("question");

    const pollEmbed = new EmbedBuilder()
      .setDescription(translations.pollEmbedTitle + "\n" + pollQuestion)
      .setImage("https://i.ibb.co/vxdBKFd/Untitled-1.gif")
      .addFields([
        { name: `${translations.pollYes}`, value: "0", inline: true },
        { name: `${translations.pollNo}`, value: "0", inline: true },
      ])
      .setColor([104, 204, 156]);

    const replyObject = await interaction.reply({
      embeds: [pollEmbed],
      fetchReply: true,
    });

    const pollButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(`${translations.pollYes}`)
        .setCustomId(`Poll-Yes-${replyObject.id}`)
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setLabel(`${translations.pollNo}`)
        .setCustomId(`Poll-No-${replyObject.id}`)
        .setStyle(ButtonStyle.Danger)
    );

    interaction.editReply({ components: [pollButtons] });
  },
};
