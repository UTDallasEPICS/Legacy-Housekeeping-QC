import { Item } from "@prisma/client";
import prisma from "../lib/prisma";

class ScoringSystem {
  rubric_id: number; // Rubric for which scores are being recorded
  items: Item[]; // Items in the rubric
  extra_score: number; // Extra score to be added to the total score

  constructor(rubric_id: number, extra_score: number) {
    this.rubric_id = rubric_id;
    this.extra_score = extra_score;
    this.items = [];
  }

  async initializeScores() {
    this.items = await prisma.item.findMany({
      where: {
        quantitative_id: this.rubric_id,
      },
    });
  }

  calculatePercentageScore(): number {
    // Calculate percentage score by dividing total score by total possible score
    return Math.round(
      (this.calculateTotalScore() / this.calculatePossibleScore()) * 100
    );
  }

  calculateTotalScore(): number {
    // Calculate score by summing up all the individual scores for checked items
    let score = 0;
    this.items.forEach((item: Item) => {
      score += item.is_checked ? item.weight : 0;
    });
    score += this.extra_score; // Add extra score
    return score;
  }

  calculatePossibleScore(): number {
    // Calculate total score by summing up all the individual scores
    let totalScore = 0;
    this.items.forEach((item: Item) => {
      totalScore += item.weight;
    });
    totalScore += this.extra_score; // Add extra score
    return totalScore;
  }

  printScores() {
    // Print out scores for each item along with room number, date, and total score
    console.log("Rubric ID: " + this.rubric_id);
    console.log("Checklist Scores:");
    this.items.forEach((item) => {
      console.log(`${item.name}: ${item.weight}`); // Print each item's score
    });
    console.log("Total Score: " + this.calculateTotalScore()); // Print total score
    console.log("Possible Score: " + this.calculatePossibleScore()); // Print total score
  }
}

export default ScoringSystem;
