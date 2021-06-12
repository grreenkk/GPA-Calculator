// Variable Selectors
const form = document.querySelector('form');
const course_code = document.getElementById('course_code');
const unit = document.getElementById('unit');
const grade = document.getElementById('grade');
const table = document.querySelector('table');
const button = document.querySelector('.buttons')
const clearTable = document.querySelector('.clear-table');
const calculate = document.querySelector('.calculate-gp');
const result = document.querySelector('.result');
const body = document.querySelector('body');
const sectionForm = document.querySelector('.section-form');
const resultAfter = document.querySelector('.result-after');
loading = document.querySelector('.loading');
let unitList = [];
let gradeList = [];


//Total Units Function
function calculateUnits(){

  var sum = 0;
  for(var i = 0; i < unitList.length; i++){
     sum += unitList[i];
  };
  return sum; 
};

//Prompt message Function
function message(text, classname){
  let p = document.createElement('p');
  p.className = classname;
  p.innerHTML = text;
  return p;
}

//Sub Total function
function calculateGrades(){
  var sum_grades = 0;
  for(i = 0; i < unitList.length; i++){
    for(j = i; j <= i; i++) {
      sum_grades += unitList[i] * gradeList[j];
      break;
    };
  };
  return sum_grades;
};



//Create and add items to table
form.addEventListener('submit', addItem)

function addItem(e) {
  if(course_code.value === '' || unit.value === '' || grade.value === ''){
    let paragraph = message('Please fill all fields', 'error');
    sectionForm.insertBefore(paragraph, form);
  
    setTimeout(function(){
      (sectionForm.insertBefore(paragraph, form)).remove();
    }, 2000); 
  }else {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${course_code.options[course_code.selectedIndex].text}</td>
                    <td>${unit.value}</td>
                    <td>${grade.options[grade.selectedIndex].text}</td>
                    <td>${grade.options[grade.selectedIndex].value * unit.value}</td>
                    <td><a class="remove-item"><i class="ion-close-round"></i></a></td>
                    `
    table.appendChild(tr);
    button.style.display = "block";
    unitList.push(Number(unit.value));
    gradeList.push(Number(grade.options[grade.selectedIndex].value));
    console.log(gradeList);

    course_code.value = '';
    unit.value = '';
    grade.value = '';

    let paragraph = message('Items added successfully', 'success');
    sectionForm.insertBefore(paragraph, form);

    setTimeout(function(){
      (sectionForm.insertBefore(paragraph, form)).remove();
    }, 2000); 

  };
  e.preventDefault();
};


//Remove individual rows in table
table.addEventListener('click', removeItem);

function removeItem(e){
  if (e.target.className == 'ion-close-round'){
    e.target.parentElement.parentElement.parentElement.remove();
  };
  
  let paragraph = message('Items deleted successfully', 'success');
  sectionForm.insertBefore(paragraph, form);

  setTimeout(function(){
    (sectionForm.insertBefore(paragraph, form)).remove();
  }, 2000); 

  e.preventDefault();
};


//Remove all items in the table(clear button)
clearTable.addEventListener('click', removeAllItems);

function removeAllItems(){
  let td = document.querySelectorAll('td')
  td.forEach(function(item){
    item.style.display = 'none';
  })
  button.style.display = "none";
  result.style.display = "none";

  let paragraph = message('All Items deleted successfully', 'success');
  sectionForm.insertBefore(paragraph, form);

  setTimeout(function(){
    (sectionForm.insertBefore(paragraph, form)).remove();
  }, 2000); 
  
}

calculate.addEventListener('click', calculateGP)

//Calculate GP(calculate button)
function calculateGP(){
  
  loading.style.display = "block"
  let tr = document.createElement('tr');
  tr.innerHTML = `<td>Total</td>
                  <td>${calculateUnits()}</td>
                  <td></td>
                  <td>${calculateGrades()}</td>
                  `
  table.appendChild(tr);

  result.innerHTML = `Your GPA is ${(calculateGrades() / calculateUnits()).toFixed(2)}`

  result.style.display = "none"
  setTimeout(function(){
    loading.style.display = "none";
    result.style.display = "block";
  }, 1500); 

}


