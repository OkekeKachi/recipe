const appId = '1a8b85ae';
const appKey = '5fddedc3e9caebfb447ab9b976c859ce';
const from = 0;
const to = 10;
const diet = 'high-protein';
let currentPage = window.location.pathname;
query = ["chicken", "bread","salad", "fish"  ];

function shuffle(item) {
    queryArr = item.sort(() => Math.random() - 0.5);

}
function checkMidnight() {
  let now = new Date();

  // Hardcoded date and time (e.g., August 15, 2024, at 7 PM)
  let hardCodedTime = new Date('2024-08-17T00:00:00');

  // Calculate the number of midnights passed
  function getMidnightsPassed(startDate, endDate) {
    // Set startDate to midnight of the next day after the hardcoded time
    let midnightAfterStart = new Date(startDate);
    midnightAfterStart.setHours(24, 0, 0, 0);

    // Set endDate to the most recent midnight
    let midnightBeforeEnd = new Date(endDate);
    midnightBeforeEnd.setHours(0, 0, 0, 0);

    // Calculate the difference in days (midnights)
    const diffInMs = midnightBeforeEnd - midnightAfterStart;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
  }

  const midnightsPassed = getMidnightsPassed(hardCodedTime, now);

  // Shuffle the array for each midnight that has passed
  for (let i = 0; i < midnightsPassed; i++) {
    shuffle(query);
  }

  
}
checkMidnight();

// if (currentPage === '/C:/Users/Student/Documents/Desktop/PROJECTS/recipe/recipe.html') {
//   query = "bread";
// } else if (currentPage === '/C:/Users/Student/Documents/Desktop/PROJECTS/recipe/breakfast.html') {
//   query = "chicken";
// } else if (currentPage === '/C:/Users/Student/Documents/Desktop/PROJECTS/recipe/lunch.html') {
//   query = "salad";
// }



// const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}&diet=${diet}`;
// let render = document.querySelector('#render')
const image = document.getElementsByClassName('responsive-img materialboxed');
const apiUrl = `https://api.edamam.com/search?q=${query[0]}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}&diet=${diet}`;

let arr = [];
let breakfast = [];
let lunch = [];
let dinner = [];

axios.get(apiUrl)
  .then(({ data }) => {
    // Handle success
    console.log(data)
    // document.getElementById('result').innerText = (data, null, 2);                              
    for (let recipes of data.hits) {
      recipe = recipes.recipe.image;
      ingredients = (recipes.recipe.ingredientLines);
      Diet = (recipes.recipe.dietLabels);
      healthLabel = (recipes.recipe.healthLabels);
      totalWeight = (recipes.recipe.totalWeight);
      label = recipes.recipe.label;
      price = Math.floor(Math.random() * 1500);

      let recipeProperties = { recipe, ingredients, Diet, healthLabel, label, totalWeight, price };
      arr.push(recipeProperties)
    }
    if (currentPage === '/C:/Users/Student/Documents/Desktop/PROJECTS/recipe/dinner.html') {
      text = "salad";
      for (let i = 0; i < (arr.length) - 1; i++) {
        const parentDiv = document.getElementById("row")
        const div = document.createElement("div")
        div.innerHTML = `
                    <div class="col s12 l4">
                      <a href="#"onclick=getIngredients(${i},'${query[0]}')>
                        <div class="card hoverable">
                                <div class="card-image">
                                    <img src=${arr[i].recipe} alt="miso_soup" class=" responsive-img materialboxed">
                                </div>
                                <div class="card-content">
                                    <p class="orange-text text-darken-4 card-head">${arr[i].label.length <= 20 ? arr[i].label : arr[i].label.substring(0, 20 - 3) + "..."}</p>
                                    <spanImpress your guests with this crowd-pleaser! A beautifully crafted dish.</span><br>
                                    <span>Get this at ${arr[i].price}</span>
                                </div>
                                <div class="card-action center">
                                    
                                    <button onclick="generateName('${arr[i].label}',${arr[i].price})" class="orange darken-4 btn">  <!-- Trigger Button -->
        <a class="modal-trigger white-text" href="#demo-modal">Order now</a></button>
                                    
                                </div>
                            </div>
                        </div>
                      </a>
                    </div>
                        `
        parentDiv.appendChild(div)
        // image[9 + i].src = lunch[i].recipe;
      }
    }    
    axios.get(`https://api.edamam.com/search?q=${query[1]}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}&diet=${diet}`).then((res) => {
      for (let recipes of res.data.hits) {
        recipe = recipes.recipe.image;
        ingredients = (recipes.recipe.ingredientLines);
        Diet = (recipes.recipe.dietLabels);
        healthLabel = (recipes.recipe.healthLabels);
        totalWeight = (recipes.recipe.totalWeight);
        label = recipes.recipe.label;
        price = Math.floor(Math.random() * 1500);

        let recipeProperties2 = { recipe, ingredients, Diet, healthLabel, label, totalWeight, price };
        breakfast.push(recipeProperties2);
      }
      console.log(res.data)
      if (currentPage === '/C:/Users/Student/Documents/Desktop/PROJECTS/recipe/breakfast.html') {
        text = "chicken";
        console.log("heyyy")
        for (let i = 0; i < breakfast.length - 1; i++) {
          console.log("heyyy")
          const parentDiv = document.getElementById("row")
          const div = document.createElement("div")
          div.innerHTML = `
                    <div class="col s12 l4">
                      <a href="#"onclick=getIngredients(${i},'${query[1]}')>
                        <div class="card hoverable">
                                <div class="card-image">
                                    <img src=${breakfast[i].recipe} alt="miso_soup" class=" responsive-img materialboxed">
                                </div>
                                <div class="card-content">
                                    <p class="orange-text text-darken-4 card-head">${breakfast[i].label.length <= 20 ? breakfast[i].label : breakfast[i].label.substring(0, 20 - 3) + "..."}</p>
                                    <span>Travel the world from your kitchen with this exotic recipe.
                                    </span><br>
                                        <span>Get this at ₦${breakfast[i].price}</span>
                                </div>
                                <div class="card-action center">
                                    
                                    <button onclick="generateName('${breakfast[i].label}',${breakfast[i].price})" class="orange darken-4 btn">  <!-- Trigger Button -->
        <a class="modal-trigger white-text" href="#demo-modal">Order now</a></button>
                                </div>
                            </div>
                        </div>
                      </a>
                    </div>
                        `
          parentDiv.appendChild(div)
          // image[9 + i].src = breakfast[i].recipe;
        }
      }
    })
    axios.get(`https://api.edamam.com/search?q=${query[2]}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}&diet=${diet}`).then((res) => {
      for (let recipes of res.data.hits) {
        recipe = recipes.recipe.image;
        ingredients = (recipes.recipe.ingredientLines);
        Diet = (recipes.recipe.dietLabels);
        healthLabel = (recipes.recipe.healthLabels);
        totalWeight = (recipes.recipe.totalWeight);
        label = recipes.recipe.label;
        price = Math.floor(Math.random() * 1500);

        let recipeProperties3 = { recipe, ingredients, Diet, healthLabel, label, totalWeight, price };
        lunch.push(recipeProperties3);
      }
      console.log(res.data)
      if (currentPage === '/C:/Users/Student/Documents/Desktop/PROJECTS/recipe/lunch.html') {
        text = "salad";
        for (let i = 0; i < (lunch.length) - 1; i++) {
          const parentDiv = document.getElementById("row")
          const div = document.createElement("div")
          div.innerHTML = `
                    <div class="col s12 l4">
                      <a href="#"onclick=getIngredients(${i},'${query[2]}')>
                        <div class="card hoverable">
                                <div class="card-image">
                                    <img src=${lunch[i].recipe} alt="miso_soup" class=" responsive-img materialboxed">
                                </div>
                                <div class="card-content">
                                    <p class="orange-text text-darken-4 card-head">${lunch[i].label.length <= 20 ? lunch[i].label : lunch[i].label.substring(0, 20 - 3) + "..."}</p>
                                    <span>A timeless classic loved by chefs and foodies alike.</span><br>
                                    <span>Get this at ₦${lunch[i].price}</span>
                                </div>
                                <div class="card-action center">
                                    
                                    <button onclick="generateName('${lunch[i].label}',${lunch[i].price})" class="orange darken-4 btn">  <!-- Trigger Button -->
        <a class="modal-trigger white-text" href="#demo-modal">Order now</a></button>
                                    
                                </div>
                            </div>
                        </div>
                      </a>
                    </div>
                        `
          parentDiv.appendChild(div)
          // image[9 + i].src = lunch[i].recipe;
        }
      } else if (currentPage === '/C:/Users/Student/Documents/Desktop/PROJECTS/recipe/recipe.html') {

        for (let i = 0; i < 3; i++) {
          const parentDiv = document.getElementById("row");
          const parentDiv2 = document.getElementById("row2");
          const parentDiv3 = document.getElementById("row3")
          const div = document.createElement('div');
          const div2 = document.createElement('div');
          const div3 = document.createElement('div');
          div.innerHTML = `
                      <div class="col s12 l4">
                        <a href="#"onclick=getIngredients(${i},'${query[1]}')>
                          <div class="card hoverable">
                              <div class="card-image">
                                  <img src="${breakfast[i].recipe}" alt="sponge cake" class=" responsive-img materialboxed">
                              </div>
                              <div class="card-content">
                                  <p class="orange-text text-darken-4 card-head">${breakfast[i].label.length <= 18 ? breakfast[i].label : breakfast[i].label.substring(0, 18 - 3) + "..."}</p>
                                  <span>Travel the world from your kitchen with this exotic recipe.
                                  </span><br>
                                  <span>Get this at ₦${breakfast[i].price}</span>
                                  <br>
                              </div>
                              <div class="card-action center">
                                  
                                  <button onclick="generateName('${breakfast[i].label}',${breakfast[i].price})" class="orange darken-4 btn">  <!-- Trigger Button -->
        <a class="modal-trigger white-text" href="#demo-modal">Order now</a></button>

                              </div>
                          </div>
                        </a>
                      </div>

    `
          div2.innerHTML = `
                      <div class="col s12 l4">
                        <a href="#"onclick=getIngredients(${i},'${query[2]}')>
                          <div class="card hoverable">
                              <div class="card-image">
                                  <img src="${lunch[i].recipe}" alt="sponge cake" class=" responsive-img materialboxed">
                              </div>
                              <div class="card-content">
                                  <p class="orange-text text-darken-4 card-head">${lunch[i].label.length <= 18 ? lunch[i].label : lunch[i].label.substring(0, 18 - 3) + "..."}</p>
                                  <span>A timeless classic loved by chefs and foodies alike.</span><br>
                                  <span>Get this at ₦${lunch[i].price}</span>
                                  <br>
                              </div>
                              <div class="card-action center">
                                  
                                    <button onclick="generateName('${lunch[i].label}',${lunch[i].price})" class="orange darken-4 btn">  <!-- Trigger Button -->
        <a class="modal-trigger white-text" href="#demo-modal">Order now</a></button>

                              </div>
                          </div>
                        </a>
                      </div>
          
          `
          div3.innerHTML = `
                      <div class="col s12 l4">
                        <a href="#"onclick=getIngredients(${i},'${query[0]}')>
                          <div class="card hoverable">
                              <div class="card-image">
                                  <img src="${arr[i].recipe}" alt="sponge cake" class=" responsive-img materialboxed">
                              </div>
                              <div class="card-content">
                                  <p class="orange-text text-darken-4 card-head">${arr[i].label.length <= 18 ? arr[i].label : arr[i].label.substring(0, 18 - 3) + "..."}</p>
                                  <span>Impress your guests with this crowd-pleaser! A beautifully crafted dish.</span><br>
                                  <span>Get this at ₦${arr[i].price}</span>
                                  <br>
                              </div>
                              <div class="card-action center">
                                  
                                    <button onclick="generateName('${arr[i].label}',${arr[i].price})" class="orange darken-4 btn">  <!-- Trigger Button -->
        <a class="modal-trigger white-text" href="#demo-modal">Order now</a></button>

                              </div>
                          </div>
                        </a>
                      </div>
          
          `
          
          parentDiv.appendChild(div)
          parentDiv2.appendChild(div2)
          parentDiv3.appendChild(div3)
        }
      }else  if (currentPage === '/C:/Users/Student/Documents/Desktop/PROJECTS/recipe/view.html') {
        food = document.getElementById("food");
        diets = document.getElementById("diets");        
        const listElement = document.getElementById('diet-list');
        const listElement2 = document.getElementById('health-list');
        nutrients = document.getElementById('nutrients');
        text = document.getElementById('text');
        viewDiv = document.getElementById("booking");
        if (queryView == query[0]) {
          food.src = arr[i].recipe;
          diets.innerText = `${arr[i].Diet}`;
          arr[i].healthLabel.forEach(health => {
            const li2 = document.createElement('li');
            li2.innerHTML = `<strong>${health}</strong>`;
            listElement2.appendChild(li2);
          });

          arr[i].ingredients.forEach(ingredients => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${ingredients}</strong>`;
            listElement.appendChild(li);
          });
          
          nutrients.innerText = `${arr[i].totalWeight}`;
          text.innerText = `${arr[i].label}`;
          viewDiv.innerHTML = `<button onclick="generateName('${arr[i].label}',${arr[i].price})" class="custom-button btn">  <!-- Trigger Button -->
            <a class="modal-trigger white-text" href="#demo-modal">Order now</a></button>`          
        } else if (queryView == query[1]) {
          food.src = breakfast[i].recipe;
          diets.innerText = `${breakfast[i].Diet}`;
          breakfast[i].healthLabel.forEach(health => {
            const li2 = document.createElement('li');
            li2.innerHTML = `<strong>${health}</strong>`;
            listElement2.appendChild(li2);
          });
          breakfast[i].ingredients.forEach(ingredients => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${ingredients}</strong>`;
            listElement.appendChild(li);
          });            
          nutrients.innerText = `${breakfast[i].totalWeight}`;
          text.innerText = `${breakfast[i].label}`;
          
          viewDiv.innerHTML = `<button onclick="generateName('${breakfast[i].label}',${breakfast[i].price})" class="custom-button btn">  <!-- Trigger Button -->
            <a class="modal-trigger white-text" href="#demo-modal">Order now</a></button>`

        } else if (queryView == query[2]) {
          // localStorage.setItem('queryyy', query);            
          food.src = lunch[i].recipe;
          diets.innerText = `${lunch[i].Diet}`;
          lunch[i].healthLabel.forEach(health => {
            const li2 = document.createElement('li');
            li2.innerHTML = `<strong>${health}</strong>`;
            listElement2.appendChild(li2);
          });
          lunch[i].ingredients.forEach(ingredients => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${ingredients}</strong>`;
            listElement.appendChild(li);
          }); 
          nutrients.innerText = `${lunch[i].totalWeight}`;
          text.innerText = `${lunch[i].label}`;
          
          viewDiv.innerHTML = `<button onclick="generateName('${lunch[i].label}',${lunch[i].price})" class="custom-button btn">  <!-- Trigger Button -->
            <a class="modal-trigger white-text" href="#demo-modal">Order now</a></button>`
          
        }
      }

    })
  })
  .catch(error => {
    // Handle error
    console.error('Error fetching data:', error);
  });




// console.log(breakfast)
function getIngredients(i, queryView) {
  window.location.href = "file:///C:/Users/Student/Documents/Desktop/PROJECTS/recipe/view.html";
  localStorage.setItem('queryyy', queryView);
  localStorage.setItem('i', i);
  localStorage.setItem('arr', arr);
  localStorage.setItem('breakfast', breakfast);
  localStorage.setItem('lunch', lunch);





  // swal("THE INGREDIENTS ARE", `${ message } `);
}
// function getInputs() {

// const form = document.querySelector('#myForm');
// const inputs = form.querySelectorAll('input');

// console.log(inputs[1].value);
// inputs.forEach(input => {
//   console.log(input.value);
//   // console.log(input.name, input.value);
// });
let food;
let amount;
h1 = document.querySelector(".heading");
function generateName(label, price) {
  food = label;
  amount = price;  
  h1.textContent = `Order for ${label} at ₦ ${price}`
}



function generateReceipt(orderData) {
  swal("ORDER SUCESSFUL")

  // i = localStorage.getItem("i");
  const docDefinition = {
    content: [
      { text: 'FIFI RECIPES', style: 'header' },
      { text: `Order Receipt for ${food}`, style: 'subheader' },
      {
        columns: [
          {
            text: [
              { text: 'Order Date: ', bold: true },
              orderData.date
            ]
          },
          {
            text: [
              { text: 'Order Time: ', bold: true },
              orderData.time
            ]
          },
          {
            text: [
              { text: 'Order #: ', bold: true },
              orderData.orderNumber
            ],
            alignment: 'right'
          }
        ]
      },
      { text: 'Customer Information', style: 'sectionHeader' },
      {
        columns: [
          {
            text: [
              { text: 'Name: ', bold: true },
              orderData.customerName,
              '\n',
              { text: 'Email: ', bold: true },
              orderData.customerEmail
            ]
          },
          {
            text: [
              { text: 'Phone: ', bold: true },
              orderData.customerPhone
            ],
            alignment: 'right'
          },
          {
            text: [
              { text: 'Delivery Address: ', bold: true },
              orderData.delivery
            ],
            alignment: 'right'
          }
        ]
      },
      { text: 'Order Details', style: 'sectionHeader' },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            ['Item', 'Quantity', 'Unit Price', 'Total'],
            ...orderData.items.map(item => [
              item.name,
              item.quantity.toString(),
              `$${item.unitPrice.toFixed(2)}`,
              `$${(item.quantity * item.unitPrice).toFixed(2)}`
            ])
          ]
        }
      },
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            table: {
              body: [
                ['Subtotal', `$${orderData.subtotal.toFixed(2)}`],
                ['Tax', `$${orderData.tax.toFixed(2)}`],
                ['Total', `$${orderData.total.toFixed(2)}`]
              ]
            },
            layout: 'noBorders'
          }
        ],
        margin: [0, 20, 0, 0]
      },
      { text: 'Thank you for your order!', style: 'footer' }
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      sectionHeader: {
        fontSize: 14,
        bold: true,
        margin: [0, 15, 0, 5]
      },
      footer: {
        fontSize: 12,
        italic: true,
        alignment: 'center',
        margin: [0, 20, 0, 0]
      }
    },
    defaultStyle: {
      fontSize: 10
    }
  };

  pdfMake.createPdf(docDefinition).download(`receipt_${orderData.orderNumber}.pdf`);
}
// Get the current date and time
const now = new Date();

// Extract the date components
const year = now.getFullYear();
const month = now.getMonth() + 1; // Months are zero-indexed, so add 1
const day = now.getDate();

// Extract the time components
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

// Format the date and time
const currentDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
const currentTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
const form = document.querySelector('#myForm');
const inputs = form.querySelectorAll('input');


// console.log(inputs[1].value);
// function getInputs() {
// }  

document.getElementById('myForm').addEventListener('submit', function () {
  if (inputs[0].value && inputs[1].value && inputs[2].value && inputs[3].value && inputs[4].value) {
    console.log(inputs)
    const orderData = {
      date: currentDate,
      time: currentTime,
      orderNumber: Math.floor(Math.random() * 456666),
      customerName: inputs[0].value,
      customerEmail: inputs[1].value,
      customerPhone: inputs[3].value,
      delivery: inputs[2].value,
      items: [
        { name: food, quantity: inputs[4].value, unitPrice: amount },
        // { name: 'Caesar Salad', quantity: 1, unitPrice: 7.99 },
        // { name: 'Soft Drink', quantity: 3, unitPrice: 2.50 }
      ],
      subtotal: amount,
      tax: 1,
      total: (inputs[4].value * amount) + 1
    };

    generateReceipt(orderData);
    
  } else {
    document.querySelector(".error").textContent ="Please fill in yout input"    
  }

  // i = localStorage.getItem("i");

});
// }