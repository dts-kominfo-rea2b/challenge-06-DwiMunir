// TODO: import module bila dibutuhkan di sini
const fs = require("fs");

// ! JANGAN DIMODIFIKASI
let file1 = "./data1.json";
let file2 = "./data2.json";
let file3 = "./data3.json";

// ! JANGAN DIMODIFIKASI
let modifyFile1 = (val) => {
  file1 = val;
};
let modifyFile2 = (val) => {
  file2 = val;
};
let modifyFile3 = (val) => {
  file3 = val;
};

const getWord = (message) => {
  const word = message.split(" ")
  return word?.length >= 1 && word[1]
}

const getData = (dataset) => {
  let stringWord = ''
  if(dataset?.message) stringWord = dataset.message

  if (dataset.length) {
    dataset?.map((item) => {
      if(item?.message !== undefined) stringWord = item.message
      if(item?.data?.message !== undefined) stringWord = item.data.message
    })
  }

  return getWord(stringWord)
}

// TODO: Kerjakan bacaData
// gunakan variabel file1, file2, dan file3
const bacaData = (callback) => {
  const list = [file1, file2, file3]
  const result = []

  list.map((item) => {
    const dataProcess = new Promise((resolve, reject) => {
      fs.readFile(item,"utf8", (err, data) => {
        if (err) {
          reject(err)
          return
        }
        const parseData = JSON.parse(data)
        resolve(getData(parseData))
      })
    }) 
    result.push(dataProcess)
  })

  Promise.all(result).then(values => {
    callback(null, values)
  }).catch(error => {
    callback(error, null)
  });
};

// ! JANGAN DIMODIFIKASI
module.exports = {
  modifyFile1,
  modifyFile2,
  modifyFile3,
  bacaData,
};
