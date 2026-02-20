/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */

export function generateReportCard(student) {
  if (typeof student !== "object" || student === null) return null;
  if (typeof student.name !== "string" || student.name.length === 0)
    return null;
  if (
    typeof student.marks !== "object" ||
    Object.keys(student.marks).length === 0
  )
    return null;

  const totolMark = Object.values(student.marks);

  if (totolMark.some((e) => typeof e !== "number" || e < 0 || e > 100)) {
    return null;
  }

  let totalMarks = totolMark.reduce((arr, data) => {
    return arr + data;
  }, 0);
  const percentage = (totalMarks / (totolMark.length * 100)) * 100;

  let totolPercentage = parseFloat(percentage.toFixed(2));

  let grade;
  if (totolPercentage >= 90) {
    grade = "A+";
  } else if (totolPercentage >= 80) {
    grade = "A";
  } else if (totolPercentage >= 70) {
    grade = "B";
  } else if (totolPercentage >= 60) {
    grade = "C";
  } else if (totolPercentage >= 40) {
    grade = "D";
  } else if (totolPercentage < 40) {
    grade = "F";
  }

  const figOut = Object.entries(student.marks);

  let highestNum = figOut.reduce((highest, current) => {
    return current[1] > highest[1] ? current : highest;
  });

  let lowestNum = figOut.reduce((lowest, current) => {
    return current[1] < lowest[1] ? current : lowest;
  });
  let passSubject = figOut.filter((e) => {
    return e[1] >= 40;
  });
  let failSubject = figOut.filter((e) => {
    return e[1] < 40;
  });
  let passTotal = passSubject.map((e) => e[0]);
  let failTotal = failSubject.map((e) => e[0]);

  return {
    name: student.name,
    totalMarks,
    percentage: totolPercentage,
    grade,
    highestSubject: highestNum[0],
    lowestSubject: lowestNum[0],
    passedSubjects: passTotal,
    failedSubjects: failTotal,
    subjectCount: figOut.length,
  };
}
