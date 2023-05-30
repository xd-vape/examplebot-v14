module.exports = {
  globalNoReason: "None specified",
  // Poll Command & Events
  pollContact: "Contact Developer: Unable to find Poll!",
  pollVoted: "Your vote has been counted!",
  pollAlreadyVoted: "You already voted!",
  pollYes: "Yes",
  pollNo: "No",
  /** Poll Embed */
  pollEmbedTitle: "**Question**",

  // Timeout
  timeoutSuccessEmbedAuthor: "Timeout issues",
  timeoutSuccessEmbedDesc: "${target} was issued a timeout by ${member}",
  /** Embed Field Text */
  timeoutSuccesFieldReasonName: "Reason",
  timeoutSuccesFieldDurationName: "Duration",
  timeoutSuccesFieldDurationValue: "${duration}",
  timeoutSuccesFieldTotalName: "Total",
  timeoutSuccesFieldTotalValue: "**${totalPoints}** points",
  /** */
  timeoutErrorText: "Could not timeout user due to an uncommen error",
  // Timeout Error Embed Message
  timeoutErrorEmbedAuthor: "Could not timeout member due to",
  timeoutErrorEmbedUserLeft: "User left the Server!",
  timeoutErrorEmbedTimeLimit: "Time provided is invalid or over the 28d limit.",
  timeoutErrorEmbedBotLowRole: "Selected target is not moderatable by this bot",
  timeoutErrorEmbedHigherRole:
    "Selected member has a higher role posistion than you",

  // Giveaway System
  embedColor: "Orange",
  embedColorEnd: "Orange",
  /** Giveaway Message */
  giveawayStartContent: "@everyone \n 🎉**GEWINNSPIEL**",
  giveawayEndContent: "❗**GEWINNSPIEL ZU ENDE**❗",
  giveawayInviteToParticipate: "Reagiere mit ✅ um mit zu machen!",
  giveawayDrawing: "Auflösung: **{timestamp}**",
  giveawayEmbedFooter: "Es wird {this.winnerCount} gewinner geben!",
  giveawayWinMessage:
    "Herzlichen Glückwunsch, {winners}! Du hast **{this.prize}** gewonnen!",
  giveawayNoWinner:
    "Gewinnspiel wurde abgebrochen, da es keine gültigen Teilnehmer gabs!",
  giveawayHostedBy: "Erstellt von {this.hostedBy}",
  giveawayWinners: "Gewinner",
  giveawayEndedAt: "Beendet am",
  /** Command Message */
  gSuccessStart: "Success! Giveaway started!",
  gSuccessPause: "Success! Giveaway paused!",
  gSuccessUnPause: "Success! Giveaway unpaused!",
  gSuccessReRoll: "Success! Giveaway rerolled!",
  gSuccessEnd: "Success! Giveaway ended!",
  gSuccessUpdate: "Success! Giveaway updated!",
};
