import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/

export function findAvgMpg(mpgs){
    let cityMpg = 0;
    let highwayMpg = 0;
    mpgs.forEach(function(element){
        cityMpg += element.city_mpg;
        highwayMpg += element.highway_mpg;
    })
    return {city: cityMpg/mpgs.length, highway: highwayMpg/mpgs.length};
}

export function getYears(mpgs) {
    const years = [];
    mpgs.forEach(element =>{
        years.push(element.year);
    });
    return years;
}

export function ratioHybrid(mpgs) {
    let total = mpgs.length;
    let hybridCount = 0;
    mpgs.forEach(element =>{
        if (element.hybrid = true){
            hybridCount++;
        }

    });
    return hybridCount/total;
}

/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: findAvgMpg(mpg_data),
    allYearStats: getStatistics(getYears(mpg_data)),
    ratioHybrids: ratioHybrid(mpg_data),
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
 export const moreStats = {
    makerHybrids: makes(mpg_data),
    avgMpgByYearAndHybrid: comp_mpg(mpg_data)
};


export function makes(mpg){
    let hybrid_cars = mpg.filter(car => car.hybrid == true);
    let makes = Array();
    let to_sort = Array();
    hybrid_cars.forEach(function(element){
        if(!makes.includes(element.make)){
            makes.push(element.make);
            to_sort.push({make: element.make, hybrids: [element.id]});
        } else{
            let found = to_sort.find(element => element.make == element.make);
            found.hybrids = found.hybrids.concat([element.id]);
        }
    })
    let sorted = to_sort.sort(function(a,b){
        if(a.hybrids.length < b.hybrids.length){
            return 1;
        } else if(a.hybrids.length > b.hybrids.length){
            return -1;
        } else{
            return 0;
        }
    })
    return sorted;
}

export function comp_mpg(mpg){
    let unsorted_years = mpg.map(function(elem){
        return elem.year;
    });
    let years = Array.from(new Set(unsorted_years));
    let data = {};

    years.forEach(function(year){
        let hybrid_cars = mpg.filter(car => car.hybrid == true && car.year == year);
        let non_hybrid = mpg.filter(car => car.hybrid == false && car.year == year);
        hybrid_cars.sort();
        non_hybrid.sort();
        data[year] = {
            hybrid: findAvgMpg(hybrid_cars),
            notHybrid: findAvgMpg(non_hybrid)
        }
    });
    return data;
}
