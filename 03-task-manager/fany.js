const stuff = {grades: [{label: "3", value: "3"}, {label: "4", value: "4"}]}
Object.keys(stuff).forEach(key => {
  if (Array.isArray(stuff[key])) {
    stuff[key].forEach(item => {
      console.log(item.value);
    });
  } else {
    console.log(stuff[key]);
  }
});
