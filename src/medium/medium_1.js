import { maxAndMin } from "../mild/mild_1.js";
import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = 0;
    for(let x = 0; x < array.length; x++){
        sum += parseInt(array[x]);
    }
    return sum;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    let median = 0;
    array.sort(function(a,b){
        return a-b;
    })
    let half = Math.floor(array.length / 2);
    if(array.length % 2){
        median = array[half];
    } else{
        median = (array[half] + array[half-1]) / 2.0;
    }
    return median;
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let minMax = maxAndMin(array);
    let min = minMax.min;
    let max = minMax.max;
    let median = getMedian(array);
    let sum = getSum(array);
    let length = array.length;
    let mean = sum / length;
    let vrnce = variance(array, mean);
    let stdDev = Math.sqrt(vrnce);

    return {length: length, sum: sum, mean: mean, median: median, min: min, max: max, variance: vrnce, standard_deviation: stdDev};
}

