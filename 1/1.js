import fs from 'fs'

const final_input_file_name = './final-input.txt'
const final_input_response_file_name = './final-input-response.txt'

const decoding_option = 'utf8'

const final_input = fs.readFileSync(final_input_file_name, decoding_option).split(/"|\\/gm).filter(el => el !== '').join('\n')
const final_input_response = fs.readFileSync(final_input_response_file_name, decoding_option).split(/"|\\/gm).filter(el => el !== '').join('\n')

function first_sum(input) {

    const filtered_input = input
        .split('\n')
        .filter(el => el !== '')
        .map(el => {
            const numbers_list = el.match(/\d/gm)

            let sum = 0

            sum = (numbers_list[0] + numbers_list.reverse()[0])
            //if (numbers_list.length === 1) sum = numbers_list[0]

            return sum
        })
        .reduce((counter, curr_el) => counter += +curr_el, 0)

    console.log(filtered_input)

    return filtered_input
}

const input_2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

// first_sum(input_2)
first_sum(final_input)
