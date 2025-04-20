const add = document.querySelector("#add");
const courseCode = document.querySelector("#course-code");
const unitLoad = document.querySelector("#unit-load");
const grade = document.querySelector("#grade");
const tbody = document.querySelector("#tbody");
const tfoot = document.querySelector("#tfoot");
const table = document.querySelector("#table");
const calcGp = document.querySelector("#calc-gp");
const clear = document.querySelector("#clear");
const print = document.querySelector("#print");

let gpArry = [];

add.addEventListener("click", () => {
  if (
    // courseCode.value === "" ||
    unitLoad.value <= 0 ||
    grade.selectedIndex === 0
  ) {
    // alert("Wrong input,check and try again");
    showError();

  } else {
    const tr = document.createElement("tr");
    const tdCourseCode = document.createElement("td");
    tdCourseCode.innerHTML = courseCode.value;
    const tdUnitLoad = document.createElement("td");
    tdUnitLoad.innerHTML = unitLoad.value;
    const tdGrade = document.createElement("td");
    tdGrade.innerHTML = grade.options[grade.selectedIndex].text;
    tr.appendChild(tdCourseCode);
    tr.appendChild(tdUnitLoad);
    tr.appendChild(tdGrade);
    tbody.appendChild(tr);
    table.classList.remove("display-none");
    calcGp.classList.remove("display-none");
    print.classList.remove("display-none");
    clear.classList.remove("display-none");
    gpArry.push({
      unitLoad: unitLoad.value,
      grade: grade.options[grade.selectedIndex].value,
    });
    console.log(gpArry);
    courseCode.value = "";
    unitLoad.value = "";
    grade.selectedIndex = "0";
  }
});

calcGp.addEventListener("click", () => {
  if (gpArry.length === 0) {
    Swal.fire({
      icon: "error",
      title: "No Courses Found",
      text: "Please add courses before calculating CGPA."
    });
    return; // Exit the function early
  }

  let unitLoads = 0,
    productOfUnitLoadsAndGrades = 0,
    sumOfProductOfUnitLoadsAndGrades = 0;

  gpArry.forEach((result) => {
    unitLoads += parseInt(result.unitLoad);
    productOfUnitLoadsAndGrades =
      parseInt(result.unitLoad) * parseInt(result.grade);
    sumOfProductOfUnitLoadsAndGrades += productOfUnitLoadsAndGrades;
  });
  const tr = document.createElement("tr");

  tdTotalUnitLoad = document.createElement("td");
  tdTotalUnitLoad.innerHTML = `Total Credit: ${unitLoads}`;

  tdGpa = document.createElement("td");
  tdGpa.setAttribute("colspan", "2");
  const cgpa = sumOfProductOfUnitLoadsAndGrades / unitLoads;
  tdGpa.innerHTML = `Your CGPA is: ${cgpa.toFixed(2)}`;

  tr.appendChild(tdTotalUnitLoad);
  tr.appendChild(tdGpa);
  if (tfoot.querySelector("tr") !== null) {
    tfoot.querySelector("tr").remove();
  }
  tfoot.appendChild(tr);

  // Show SweetAlert based on CGPA
  showCGPAAlert(cgpa);
});

clear.addEventListener("click", () => {
  gpArry = [];
  tbody.querySelectorAll("*").forEach((child) => child.remove());
  if (tfoot.querySelector("tr") !== null) {
    tfoot.querySelector("tr").remove();
  }

  table.classList.add("display-none");
  print.classList.add("display-none");
  calcGp.classList.add("display-none");
  clear.classList.add("display-none");
});

function showError(){
  Swal.fire({
    icon: "error",
    title: "Enter valid input!",
    text: "You need to enter a valid input to proceed!",
    // footer: '<a href="#">Why do I have this issue?</a>'
  });
}


function showCGPAAlert(cgpa) {
  let message = "";
  let icon = "";

  if (cgpa <= 0) {
    message = "Oops! Your CGPA is invalid.";
    icon = "error";
  } else if (cgpa >= 1 && cgpa <= 5.99) {
    message = `Your CGPA is average. Your SGPA is ${cgpa.toFixed(2)}`;
    icon = "info";
  } else if (cgpa >= 6 && cgpa <= 6.99) {
    message = `Your CGPA is good. Your SGPA is ${cgpa.toFixed(2)}`;
    icon = "success";
  } else if (cgpa >= 7 && cgpa <= 7.99) {
    message = `Your CGPA is very good. Your SGPA is ${cgpa.toFixed(2)}`;
    icon = "success";
  } else if (cgpa >= 8 && cgpa <= 8.99) {
    message = `Your CGPA is excellent. Your SGPA is ${cgpa.toFixed(2)}`;
    icon = "success";
  } else if (cgpa >= 9 && cgpa <= 10) {
    message = `Your CGPA is outstanding. Your SGPA is ${cgpa.toFixed(2)}`;
    icon = "success";
  }

  Swal.fire({
    icon: icon,
    title: "CGPA Evaluation",
    text: message
  });
}
