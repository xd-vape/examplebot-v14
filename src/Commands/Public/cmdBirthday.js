const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const dataBase = require("../../Schemas/Birthdays");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testbirthday")
    .setDescription("Geburtstag Command")
    .setDMPermission(false)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Füge dein Geburtstag hinzu")
        .addStringOption((options) =>
          options
            .setName("geburtsdatum")
            .setDescription("test")
            .setRequired(true)
        )
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const { options, guild, member } = interaction;

    switch (options.getSubcommand()) {
      case "add": {
        const userDate = options.getString("geburtsdatum");
        const pattern = /^\d{2}-\d{2}$/;

        if (pattern.test(userDate)) {
          if (/^\d+$/.test(userDate.replace("-", ""))) {
            const [day, month] = userDate.split("-");
            const birthdayDay = parseInt(day);
            const birthdayMonth = parseInt(month);

            if (
              birthdayDay >= 1 &&
              birthdayDay <= 31 &&
              birthdayMonth >= 1 &&
              birthdayMonth <= 12
            ) {
              // const { nextBirthday, age } = calculateNextAge(userDate);

              const age = calculateAge(userDate);

              console.log(`Das Alter des Benutzers ist: ${age} Jahre.`);

              const data = await dataBase.findOne({
                Guild: guild.id,
                UserID: member.id,
                UserName: member.user.username,
              });

              if (!data) {
                await dataBase.create({
                  Guild: guild.id,
                  UserID: member.id,
                  UserName: member.user.username,
                  BirthdayDate: userDate,
                });
              } else {
                await dataBase.updateMany(
                  {},
                  {
                    $set: {
                      UserName: member.user.username,
                      BirthdayDate: userDate,
                    },
                  }
                );
              }

              // await interaction.reply({
              //   content: "saved.",
              //   ephemeral: true,
              // });
            } else {
              // Die Eingabe liegt außerhalb des zulässigen Bereichs (XX-12).
              await interaction.reply(
                "Die Eingabe liegt außerhalb des zulässigen Bereichs (XX-12)."
              );
            }
          } else {
            await interaction.reply(
              "Die Eingabe enthält Buchstaben oder andere Zeichen und sollte nur aus Zahlen und Bindestrichen bestehen."
            );
          }
        } else {
          await interaction.reply(
            "Die Eingabe entspricht nicht dem erwarteten Format (z. B. 10-15)."
          );
        }
      }
    }
  },
};

function isNumeric(input) {
  return !isNaN(input) && !isNaN(parseFloat(input));
}

function calculateAge(birthDate) {
  const today = new Date();
  const [birthDay, birthMonth] = birthDate.split("-").map(Number);
  const birthYear = today.getFullYear();
  const birthDateThisYear = new Date(birthYear, birthMonth - 1, birthDay);

  if (today >= birthDateThisYear) {
    // Geburtstag hat bereits stattgefunden in diesem Jahr
    return today.getFullYear() - birthYear;
  } else {
    // Geburtstag steht noch aus in diesem Jahr
    return today.getFullYear() - birthYear - 1;
  }
}

function getMonthName(month) {
  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  return monthNames[month];
}

function toOrdinalSuffix(num) {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];

  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + digits[0] - 1
    : int;
}
