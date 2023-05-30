const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const ms = require("ms");
const client = require("../../Structures/Classes/discordClient");
let translations = require("../../Structures/Language/local");
const Config = require("../../Structures/config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giveaway")
    .setDescription("Create a giveaway")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("start")
        .setDescription("Start a Giveaway")
        .addChannelOption((options) =>
          options
            .setName("channel")
            .setDescription("Select a Channel to start the Giveaway")
            .setRequired(true)
        )
        .addStringOption((options) =>
          options
            .setName("prize")
            .setDescription("What is the Prize")
            .setRequired(true)
        )
        .addIntegerOption((options) =>
          options
            .setName("winnercount")
            .setDescription("How much people can win?")
            .setRequired(true)
        )
        .addStringOption((options) =>
          options
            .setName("duration")
            .setDescription("select a time")
            .setRequired(true)
        )
        .addStringOption((options) =>
          options
            .setName("imgurl")
            .setDescription(
              "You can add a Image to the Message if you want too"
            )
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("pause")
        .setDescription("Start a Giveaway")
        .addStringOption((options) =>
          options
            .setName("messageid")
            .setDescription("Message ID of the Giveaway")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("unpause")
        .setDescription("Start a Giveaway")
        .addStringOption((options) =>
          options
            .setName("messageid")
            .setDescription("Message ID of the Giveaway")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("reroll")
        .setDescription("Start a Giveaway")
        .addStringOption((options) =>
          options
            .setName("messageid")
            .setDescription("Message ID of the Giveaway")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("end")
        .setDescription("Start a Giveaway")
        .addStringOption((options) =>
          options
            .setName("messageid")
            .setDescription("Message ID of the Giveaway")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("edit")
        .setDescription("Start a Giveaway")
        .addStringOption((options) =>
          options
            .setName("messageid")
            .setDescription("Message ID of the Giveaway")
            .setRequired(true)
        )
        .addStringOption((options) =>
          options
            .setName("newprize")
            .setDescription("What is the Prize")
            .setRequired(true)
        )
        .addStringOption((options) =>
          options
            .setName("newduration")
            .setDescription("select a time")
            .setRequired(true)
        )
        .addIntegerOption((options) =>
          options
            .setName("newwinnercount")
            .setDescription("How much people can win?")
            .setRequired(true)
        )
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { options, guild, member } = interaction;

    const infoEmbed = new EmbedBuilder()
      .setColor("Yellow")
      .setAuthor({ name: "COMMAND INFO" });

    switch (options.getSubcommand()) {
      case "start":
        {
          const channel = options.getChannel("channel");
          const duration = options.getString("duration");
          const winnerCount = options.getInteger("winnercount");
          const prize = options.getString("prize");
          const imgurl = options.getString("imgurl");

          const embed = new EmbedBuilder()
            .setColor("Orange")
            .setDescription(`${translations.giveawayWinMessage}`);

          if (Config.useWinMessageAsEmbed) {
            client.giveawaysManager
              .start(channel, {
                duration: ms(duration),
                winnerCount,
                prize,
                hostedBy: interaction.member.user,
                botsCanWin: Config.botsCanWin,
                embedColor: `${translations.embedColor}`,
                embedColorEnd: `${translations.embedColorEnd}`,
                image: imgurl,
                messages: {
                  giveaway: `${translations.giveawayStartContent}`,
                  giveawayEnded: `${translations.giveawayEndContent}`,
                  inviteToParticipate: `${translations.giveawayInviteToParticipate}`,
                  drawing: `${translations.giveawayDrawing}`,
                  embedFooter: `${translations.giveawayEmbedFooter}`,
                  winMessage: {
                    content: "{winners}",
                    embed: embed,
                    replyToGiveaway: true,
                  },
                  noWinner:
                    "Gewinnspiel wurde abgebrochen, da es keine gültigen Teilnehmer gabs!",
                  hostedBy: "Erstellt von {this.hostedBy}",
                  winners: "Gewinner",
                  endedAt: "Beendet am",
                },
              })
              .then((data) => {
                infoEmbed
                  .setColor("Green")
                  .setDescription(`${translations.gSuccessStart}`);
                return interaction
                  .reply({
                    embeds: [infoEmbed],
                    ephemeral: true,
                  })
                  .then(() => {
                    setTimeout(() => interaction.deleteReply(), 3000);
                  });
              });
          } else {
            client.giveawaysManager
              .start(channel, {
                duration: ms(duration),
                winnerCount,
                prize,
                hostedBy: interaction.member.user,
                botsCanWin: Config.botsCanWin,
                embedColor: `${translations.embedColor}`,
                embedColorEnd: `${translations.embedColorEnd}`,
                image: imgurl,
                messages: {
                  giveaway: `${translations.giveawayStartContent}`,
                  giveawayEnded: `${translations.giveawayEndContent}`,
                  inviteToParticipate: `${translations.giveawayInviteToParticipate}`,
                  drawing: `${translations.giveawayDrawing}`,
                  embedFooter: `${translations.giveawayEmbedFooter}`,
                  winMessage: `${translations.giveawayWinMessage}`,
                  noWinner:
                    "Gewinnspiel wurde abgebrochen, da es keine gültigen Teilnehmer gabs!",
                  hostedBy: "Erstellt von {this.hostedBy}",
                  winners: "Gewinner",
                  endedAt: "Beendet am",
                },
              })
              .then((data) => {
                infoEmbed
                  .setColor("Green")
                  .setDescription("Giveaway wurde erfolgreich gestartet");
                return interaction
                  .reply({
                    embeds: [infoEmbed],
                    ephemeral: true,
                  })
                  .then(() => {
                    setTimeout(() => interaction.deleteReply(), 3000);
                  });
              });
          }
        }
        break;
      case "pause":
        {
          const messageID = options.getString("messageid");
          client.giveawaysManager
            .pause(messageID)
            .then(() => {
              infoEmbed.setDescription(`${translations.gSuccessPause}`);
              interaction.reply({ embeds: [infoEmbed] }).then(() => {
                setTimeout(() => interaction.deleteReply(), 4000);
              });
            })
            .catch((err) => {
              infoEmbed.setColor("Red");
              infoEmbed.setDescription(
                `An error has occurred, please check and try again.\n\`${err}\``
              );
              interaction.reply({ embeds: [infoEmbed] }).then(() => {
                setTimeout(() => interaction.deleteReply(), 4000);
              });
            });
        }
        break;
      case "unpause":
        {
          const messageID = options.getString("messageid");
          client.giveawaysManager
            .unpause(messageID)
            .then(() => {
              infoEmbed.setDescription(`${translations.gSuccessUnPause}`);
              interaction.reply({ embeds: [infoEmbed] }).then(() => {
                setTimeout(() => interaction.deleteReply(), 4000);
              });
            })
            .catch((err) => {
              infoEmbed.setColor("Red");
              infoEmbed.setDescription(
                `An error has occurred, please check and try again.\n\`${err}\``
              );
              interaction.reply({ embeds: [infoEmbed] }).then(() => {
                setTimeout(() => interaction.deleteReply(), 4000);
              });
            });
        }
        break;
      case "reroll":
        {
          const messageID = options.getString("messageid");
          client.giveawaysManager
            .reroll(messageID)
            .then(() => {
              infoEmbed.setDescription(`${translations.gSuccessReRoll}`);
              interaction.reply({ embeds: [infoEmbed] }).then(() => {
                setTimeout(() => interaction.deleteReply(), 4000);
              });
            })
            .catch((err) => {
              infoEmbed.setColor("Red");
              infoEmbed.setDescription(
                `An error has occurred, please check and try again.\n\`${err}\``
              );
              interaction.reply({ embeds: [infoEmbed] }).then(() => {
                setTimeout(() => interaction.deleteReply(), 4000);
              });
            });
        }
        break;
      case "end":
        {
          const messageID = options.getString("messageid");
          client.giveawaysManager
            .end(messageID)
            .then(() => {
              infoEmbed.setDescription(`${translations.gSuccessEnd}`);
              interaction.reply({ embeds: [infoEmbed] }).then(() => {
                setTimeout(() => interaction.deleteReply(), 4000);
              });
            })
            .catch((err) => {
              infoEmbed.setColor("Red");
              infoEmbed.setDescription(
                `An error has occurred, please check and try again.\n\`${err}\``
              );
              interaction.reply({ embeds: [infoEmbed] }).then(() => {
                setTimeout(() => interaction.deleteReply(), 4000);
              });
            });
        }
        break;
      case "edit":
        {
          const messageID = options.getString("messageid");
          const newPrize = options.getString("newprize");
          const newDuration = options.getString("newduration");
          const newWinnerCount = options.getInteger("newwinnercount");
          client.giveawaysManager
            .edit(messageID, {
              addTime: newDuration,
              newWinnerCount: newWinnerCount,
              newPrize: newPrize,
            })
            .then(() => {
              infoEmbed.setDescription(`${translations.gSuccessUpdate}`);
              interaction.reply({ embeds: [infoEmbed] }).then(() => {
                setTimeout(() => interaction.deleteReply(), 4000);
              });
            })
            .catch((err) => {
              infoEmbed.setColor("Red");
              infoEmbed.setDescription(
                `An error has occurred, please check and try again.\n\`${err}\``
              );
              interaction.reply({ embeds: [infoEmbed] }).then(() => {
                setTimeout(() => interaction.deleteReply(), 4000);
              });
            });
        }
        break;
    }
  },
};
