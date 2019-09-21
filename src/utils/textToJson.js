var fs = require('fs');

const fillData = () => {
  var obj = {
    words: []
  };
  var textByLine = fs
    .readFileSync('./words.txt')
    .toString()
    .split('\n');

  obj.words = textByLine;

  const jsonString = JSON.stringify(obj);
  fs.writeFile('./words.json', jsonString, err => {
    if (err) {
      console.log('Error writing file', err);
    } else {
      console.log('Successfully wrote file');
    }
  });
};

fillData();
