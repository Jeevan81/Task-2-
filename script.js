const exampleNames = [
  "abhi", "babu", "charan", "divya", "elina", "farhan", "gita", "harsh", "isha",
  "jatin", "kiran", "lavanya", "manav", "naina", "omkar", "priya", "qureshi",
  "rahul", "sneha", "tarun", "usha", "vikas", "wasim", "xenia", "yuvraj", "zoya"
];

const data = Array.from({ length: 100 }, (_, i) => {
  const name = exampleNames[i % exampleNames.length];
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: i + 1,
    name: `${capitalized} ${i + 1}`,
    age: 20 + (i % 30),
    email: `${name}${i + 1}@example.com`
  };
});

let currentPage = 1;
const rowsPerPage = 10;
let filteredData = data;
let sortDirection = true;

function displayTable(page = 1) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  filteredData.slice(start, end).forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.name}</td>
      <td>${row.age}</td>
      <td>${row.email}</td>
    `;
    tableBody.appendChild(tr);
  });

  document.getElementById("pageInfo").textContent = `Page ${currentPage}`;
}

function sortTable(colIndex) {
  const keys = ["id", "name", "age", "email"];
  const key = keys[colIndex];
  filteredData.sort((a, b) => {
    return sortDirection
      ? a[key] > b[key] ? 1 : -1
      : a[key] < b[key] ? 1 : -1;
  });
  sortDirection = !sortDirection;
  displayTable(currentPage);
}

function filterData() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  filteredData = data.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(query)
    )
  );
  currentPage = 1;
  displayTable(currentPage);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayTable(currentPage);
  }
}

function nextPage() {
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayTable(currentPage);
  }
}

function exportCSV() {
  const csvRows = [
    ["ID", "Name", "Age", "Email"],
    ...filteredData.map(row => [row.id, row.name, row.age, row.email])
  ];
  const csvContent = csvRows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.csv";
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById("searchInput").addEventListener("input", filterData);
window.onload = () => displayTable(currentPage);
