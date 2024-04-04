class scoringSystem {
  roomNumber: string;  // Room number for which scores are being recorded
  date: Date;          // Date for which scores are being recorded
  scores: Map<string, number>;  // Map to store scores for each item

  constructor(roomNumber: string, date: Date) {
      this.roomNumber = roomNumber;
      this.date = date;
      this.scores = new Map<string, number>();  // Initialize scores map
      this.initializeScores();  // Initialize scores for each item
  }

  initializeScores() {
      // Initialize scores for each item in the checklist
      const items = [
          // "check unacceptable items" section
          "Telephone", "Overbed Table", "Bedside Table", "Call Button", "Bed",
          "Trash Can", "Television", "Walls", "Corners & Edges", "Doors", "Floors",

          // "Restroom" section
          "Sink", "Walls", "Mirrors", "Dispensers", "Tub/Shower", "Toilet", "Floor",
          
          // "Dusting" section
          "Low Dusting", "High Dusting"
      ];
      for (const item of items) {
          this.scores.set(item, 0);  // Initialize each item's score to 0
      }
  }

  updateScore(item: string, score: number) {
      // Update score for a particular item
      if (this.scores.has(item)) {
          this.scores.set(item, score);  // Update the score for the specified item
      } else {
        console.warn(`Item "${item}" not found in the checklist.`); 
      }
  }

  calculateTotalScore(): number {
    // Calculate total score by summing up all the individual scores
    let totalScore = 0;
    this.scores.forEach((score: number) => {
        totalScore += score;
    });
    return totalScore;
}


printScores() {
  // Print out scores for each item along with room number, date, and total score
  console.log("Room Number: " + this.roomNumber);
  console.log("Date: " + this.date.toDateString());
  console.log("Checklist Scores:");
  this.scores.forEach((score, item) => {
      console.log(`${item}: ${score}`);  // Print each item's score
  });
  console.log("Total Score: " + this.calculateTotalScore());  // Print total score
}
}




