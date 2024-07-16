// script.js 

// For edit item 
let index = -1; 
const table = document.getElementById("table"); 

// For sorting ascending or descending 
const flag = { Name: false, Cat: false, Year: false }; 
let data = [ 
	{ Name: "HTML", Cat: "Web", Year: "1993" }, 
	{ 
		Name: "Java", 
		Cat: "Programming", 
		Year: "1995", 
	}, 
	{ Name: "JavaScript", Cat: "Web", Year: "1995" }, 
	{ Name: "MongoDB", Cat: "Database", Year: "2007" }, 
	{ Name: "Python", Cat: "Programming", Year: "1991" }, 
]; 

// To switch update or add form 
const switchEdit = () => { 
	document.getElementById("submitItem").style.display = 
		"none"; 
	document.getElementById("editItem").style.display = ""; 
}; 

const switchAdd = () => { 
	document.getElementById("submitItem").style.display = 
		""; 
	document.getElementById("editItem").style.display = 
		"none"; 
}; 

// To create table 
function addItem(e, i) { 
	row = table.insertRow(i + 1); 
	let c0 = row.insertCell(0); 
	let c1 = row.insertCell(1); 
	let c2 = row.insertCell(2); 
	let c3 = row.insertCell(3); 
	c4 = row.insertCell(4); 
	let c5 = row.insertCell(5); 
	c0.innerText = i + 1; 
	c1.innerText = e.Name; 
	c2.innerText = e.Cat; 
	c3.innerText = e.Year; 
	c4.innerHTML = ""; 
	c5.innerHTML = "☒"; 
	c4.classList.add("zoom"); 
	c5.classList.add("zoom"); 
	c4.addEventListener("click", () => edit(c4, i)); 
	c5.addEventListener("click", () => del(e)); 
} 

// Traverse and insert items to table 
data.map((e, i) => addItem(e, i)); 

// For sorting in different cases 
function sortItems(title) { 
	remove(); 
	switch (title) { 
		case "name": 
			sortName(); 
			break; 
		case "category": 
			sortCat(); 
			break; 
		case "year": 
			sortYear(); 
			break; 
		default: 
			console.log("Default"); 
	} 
	data.map((e, i) => addItem(e, i)); 
} 

// Clear the table before updation 
function remove() { 
	console.log("removed"); 
	while (table.rows.length > 1) table.deleteRow(-1); 
} 

// Sort with names 
function sortName() { 
	data.sort((a, b) => { 
		let fa = a.Name.toLowerCase(), 
			fb = b.Name.toLowerCase(); 
		console.log(fa, fb); 

		if (fa < fb) { 
			return -1; 
		} 
		if (fa > fb) { 
			return 1; 
		} 
		return 0; 
	}); 
	if (flag.Name) data.reverse(); 
	flag.Name = !flag.Name; 
} 

// Sort with categories 
function sortCat() { 
	data.sort((a, b) => { 
		let fa = a.Cat.toLowerCase(), 
			fb = b.Cat.toLowerCase(); 
		console.log(fa, fb); 

		if (fa < fb) { 
			return -1; 
		} 
		if (fa > fb) { 
			return 1; 
		} 
		return 0; 
	}); 
	if (flag.Cat) data.reverse(); 
	flag.Cat = !flag.Cat; 
} 

// Sort with year 
function sortYear() { 
	data.sort((a, b) => a.Year - b.Year); 
	if (flag.Year) data.reverse(); 
	flag.Year = !flag.Year; 
} 

// To search and filter items 
    function searchItems() { 
	let input = document 
		.getElementById("searchInput") 
		.value.toLowerCase(); 
	let filterItems = data.filter((e) => { 
		return ( 
			e.Name.toLowerCase().includes(input) || 
			e.Cat.toLowerCase().includes(input) || 
			e.Year.includes(input) 
		); 
	}); 

	remove(); 
	filterItems.map((e, i) => addItem(e, i)); 
} 

// Initiate edit form 
function edit(c, i) { 
	console.log(c.classList.value); 
	if (c.classList.value === "zoom") { 
		c.classList.add("open"); 
		el = data[i]; 
		switchEdit(); 

		let nameInput = 
			document.getElementById("nameInput"); 
		let catInput = document.getElementById("catInput"); 
		let yearInput = 
			document.getElementById("yearInput"); 
		nameInput.value = el.Name; 
		catInput.value = el.Cat; 
		yearInput.value = el.Year; 
		index = i; 
	} else { 
		c.classList.value = "zoom"; 
		switchAdd(); 

		document.getElementById("nameInput").value = ""; 
		document.getElementById("catInput").value = ""; 
		document.getElementById("yearInput").value = ""; 
		index = -1; 
	} 
} 

// Submit edit data 
function editItem() { 
	console.log("edit"); 
	nameInput = document.getElementById("nameInput"); 
	catInput = document.getElementById("catInput"); 
	yearInput = document.getElementById("yearInput"); 
	data[index] = { 
		Name: nameInput.value, 
		Cat: catInput.value, 
		Year: yearInput.value, 
	}; 
	remove(); 
	data.map((e, i) => addItem(e, i)); 

	nameInput.value = ""; 
	catInput.value = ""; 
	yearInput.value = ""; 
	switchAdd(); 
} 

// Add new data 
function submitItem() { 
	console.log("submit clicked"); 
	nameInput = document.getElementById("nameInput").value; 
	catInput = document.getElementById("catInput").value; 
	yearInput = document.getElementById("yearInput").value; 
	if ( 
		nameInput === "" || 
		catInput === "" || 
		yearInput === ""
	) { 
		window.alert("incomplete input data"); 
		return; 
	} 
	data.push({ 
		Name: nameInput, 
		Cat: catInput, 
		Year: yearInput, 
	}); 
	document.getElementById("nameInput").value = ""; 
	document.getElementById("catInput").value = ""; 
	document.getElementById("yearInput").value = ""; 
	remove(); 
	data.map((e, i) => addItem(e, i)); 
	console.log(data); 
} 

// Delete specific field 
function del(el) { 
	console.log("del clicked", el); 
	remove(); 
	data = data.filter((e) => e.Name !== el.Name); 
	data.map((e, i) => addItem(e, i)); 
}
