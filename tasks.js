// Example object with fields
const myForm = document.getElementById('myForm');

// toObject method using map instead of $.each
function toObject() {
    const elements = myForm.elements;
    return Array.from(elements)
        .filter(element => element.name) // Filter out elements without a name attribute
        .reduce((obj, element) => {
            obj[element.name] = element.value;
            return obj;
        }, {});
}

// fromObject method to populate form fields
function fromObject(obj) {
    Object.keys(obj).forEach(key => {
        const field = myForm.elements[key];
        if (field) {
            field.value = obj[key];
        }
    });
}

document.getElementById('printObject').addEventListener('click', function() {
    const obj = toObject();
    console.log(JSON.stringify(obj, null, 2));
});

document.getElementById('loadObject').addEventListener('click', function() {
    // Example object with values to load into the form
    const exampleObject = {
        field1: 'Value 1',
        field2: 'Value 2'
        // Add more fields and values as needed
    };
    fromObject(exampleObject);
});
