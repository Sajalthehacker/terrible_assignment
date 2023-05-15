import React, { useState } from 'react'
import axios from 'axios'
// import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

function C1() {

  const [data, setData] = useState([])
  // const [histogram, setHistogram] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('https://www.terriblytinytales.com/test.txt')
    // console.log(response.data);
    const myData = response.data.replace(/[1-9]\.|[1-9][0-9]\./g, '').replace(/[?]|\s[/]\s/gi, '')
      .replace(/[,]/g, '').replace(/[;]/g, '').replace(/\.\s/g, ' ').replace(/[()]/g, ' ').replace(/city\/college/gi, 'city  college');

      console.log('printing response fetched')
    console.log(typeof(response.data))
    console.log(myData);
    console.log('printing all the words in content fetched');
    const wordArr = myData.split(/\s+/)
    console.log(wordArr);

    const frequency = {}
    wordArr.forEach((word) => {
      if (frequency[word]) {
        frequency[word]++;
      } else {
        frequency[word] = 1;
      }
    });

    console.log('printing words with their frequencies')
    console.log(frequency);
    console.log(typeof(frequency));
    console.log('converting above object into array')
    const frequencyArr = Object.entries(frequency)
    console.log(frequencyArr);
    console.log(typeof (frequencyArr));



    const topWords = frequencyArr.sort((a, b) => {
      return b[1] - a[1];
    }).slice(0, 20)
    console.log('printing top 20 high frequncy words');
    console.log(topWords)

    const wordsArr = topWords.map((obj) => obj[0])
    const freqArr = topWords.map((obj) => obj[1])
    console.log('printing array of all 20 words ');
    console.log(wordsArr);
    console.log('printing array of frequencies')
    console.log(freqArr);

    const bothArr = [];
    for (let i = 0; i < wordsArr.length; i++) {
      bothArr.push([wordsArr[i], freqArr[i]])
    }
    console.log('print an array having each element has 2 values first is word and second its frequency');
    console.log(bothArr);
    setData(bothArr)

    // plotting graph
    // setHistogram({
    //   labels: wordsArr,
    //   datasets: [
    //     {
    //       label: 'Occurence',
    //       backgroundColor: [
    //         "aqua", "green", "red", "yellow", 
    //         "aqua", "green", "red", "yellow",
    //         "aqua", "green", "red", "yellow", 
    //         "aqua", "green", "red", "yellow",
    //         "aqua", "green", "red", "yellow"
    //       ],
    //       borderWidth: 0,
    //       data: freqArr
    //     }
    //   ]
    // })
  }

  return (
    <div>
      <button onClick={fetchData}>Submit</button>
      <p>Top 20 Most Occuring Words with their frequecies: </p>
      <ol>
        {
          data.map((element, index) => {
            return <li key={index}>Word - {element[0]} and its frequency is - {element[1]}</li>
          })
        }
      </ol>

      {/* <Bar
        data={histogram}
        height={500}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  // The y-axis value will start from zero
                  beginAtZero: true,
                },
              },
            ],
          },
          title: {
            display: true,
            text: 'Number Of Occurences Of Word',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      /> */}
    </div>
  )
}

export default C1

