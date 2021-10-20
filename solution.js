const employees = [
  { id: 1, name: "moe" },
  { id: 2, name: "larry", managerId: 1 },
  { id: 4, name: "shep", managerId: 2 },
  { id: 3, name: "curly", managerId: 1 },
  { id: 5, name: "groucho", managerId: 3 },
  { id: 6, name: "harpo", managerId: 5 },
  { id: 8, name: "shep Jr.", managerId: 4 },
  { id: 99, name: "lucy", managerId: 1 },
];

const spacer = (text) => {
  if (!text) {
    return console.log("");
  }
  const stars = new Array(5).fill("*").join("");
  console.log(`${stars} ${text} ${stars}`);
};

const findEmployeeByName = (name, employees) => {
  let obj;
  employees.every((val) => {
    if (val.name === name) {
      obj = val;
      return false;
    }
    return true;
  });
  return obj;
};

spacer("findEmployeeByName Moe");
// given a name and array of employees, return employee
console.log(findEmployeeByName("moe", employees)); //{ id: 1, name: 'moe' }
spacer("");

const findManagerFor = (func, employees) => {
  const employee = func;
  let obj;
  employees.every((val) => {
    if (val.id === employee.managerId) {
      obj = val;
      return false;
    }
    return true;
  });
  return obj;
};

spacer("findManagerFor Shep Jr.");
//given an employee and a list of employees, return the employee who is the manager
console.log(
  findManagerFor(findEmployeeByName("shep Jr.", employees), employees)
); //{ id: 4, name: 'shep', managerId: 2 }
spacer("");

spacer("findCoworkersFor Larry");

const findCoworkersFor = (func, employees) => {
  const employee = func;
  const coworkers = [];
  employees.forEach((val) => {
    if (employee.managerId === val.managerId && employee.id !== val.id) {
      coworkers.push(val);
    }
  });
  return coworkers;
};

//given an employee and a list of employees, return the employees who report to the same manager
console.log(
  findCoworkersFor(findEmployeeByName("larry", employees), employees)
); /*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */

spacer("");

const findManagementChainForEmployee = (func, employees) => {
  const chain = [];
  const employee = func;

  if (employee.managerId === undefined) {
    return [];
  }
  employees.reverse();

  let currManId = employee.managerId;
  employees.forEach((val) => {
    if (val.managerId === undefined || val.id === currManId) {
      currManId = val.managerId;
      chain.push(val);
    }
  });
  employees.reverse();

  return chain.reverse();
};

spacer("findManagementChainForEmployee for moe");
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
console.log(
  findManagementChainForEmployee(
    findEmployeeByName("moe", employees),
    employees
  )
); //[  ]
spacer("");

spacer("findManagementChainForEmployee for shep Jr.");
console.log(
  findManagementChainForEmployee(
    findEmployeeByName("harpo", employees),
    employees
  )
); /*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
spacer("");

// const generateManagementTree = (employees) => {
//   // employees.
// };

/*
  { id: 1, name: "moe" },
  { id: 2, name: "larry", managerId: 1 },
  { id: 4, name: "shep", managerId: 2 },
  { id: 3, name: "curly", managerId: 1 },
  { id: 5, name: "groucho", managerId: 3 },
  { id: 6, name: "harpo", managerId: 5 },
  { id: 8, name: "shep Jr.", managerId: 4 },
  { id: 99, name: "lucy", managerId: 1 },
*/

const generateManagementTree = (employees) => {
  const arr = [];
  let managerToCheck;
  let index;
  employees.forEach((val, currIndex) => {
    managerToCheck = val.id;
    index = currIndex + 1;
    arr.push({
      id: val.id,
      name: val.name,
      reports: [],
    });

    employees.shift();

    employees.every((val) => {
      if (val.managerId === index) {
        return false;
      }
    });
  });
  return arr;
};

spacer("generateManagementTree");
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
  {
    "id": 1,
    "name": "moe",
    "reports": [
      {
        "id": 2,
        "name": "larry",
        "managerId": 1,
        "reports": [
          {
            "id": 4,
            "name": "shep",
            "managerId": 2,
            "reports": [
              {
                "id": 8,
                "name": "shep Jr.",
                "managerId": 4,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "curly",
        "managerId": 1,
        "reports": [
          {
            "id": 5,
            "name": "groucho",
            "managerId": 3,
            "reports": [
              {
                "id": 6,
                "name": "harpo",
                "managerId": 5,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 99,
        "name": "lucy",
        "managerId": 1,
        "reports": []
      }
    ]
  }
  */
spacer("");

const displayManagementTree = () => {};

spacer("displayManagementTree");
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(
  generateManagementTree(employees)
); /*
  moe
  -larry
  --shep
  ---shep Jr.
  -curly
  --groucho
  ---harpo
  -lucy
  */

//  employees.forEach((val2, ind) => {
//   if (val2.managerId === managerToCheck) {
//     arr[index].reports.push({
//       id: val2.id,
//       name: val2.name,
//       reports: [],
//     });
//     employees.slice(ind, 1);
//   }
// });
