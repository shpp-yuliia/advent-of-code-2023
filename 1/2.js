import fs from 'fs'

String.prototype.reverseString = function() { return this.toString().split('').reverse().join('') }
String.prototype.makeReadableFileData = function() { return this.split(/"|\\/gm).filter(el => el !== '').join('\n')  }

const final_input_file_name = './final-input.txt'
const final_input_response_file_name = './final-input-response.txt'

const decoding_option = 'utf8'

const final_input = fs.readFileSync(final_input_file_name, decoding_option).split(/"|\\/gm).filter(el => el !== '').join('\n')

function first_sum(input) {
    const words_numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    const number_list_regexp = new RegExp(`([0-9])|(${words_numbers.join('|')})`, 'gm')
    const last_numbers_list_regexp = new RegExp(`([0-9])|(${words_numbers.map(word => word.reverseString()).join('|')})`, 'gm')

    const filtered_input = input
        .split('\n')
        .filter(el => el !== '')
        .map(el => {
            const numbers_list = el
                .match(number_list_regexp, 'gm')
                .map(el => {
                    if (+el) return el
                    if (!+el) return `${(words_numbers.indexOf(el) + 1)}`
                })

            const last_numbers_list = el
                .reverseString()
                .match(last_numbers_list_regexp)
                .map(el => {
                    if (+el) return el
                    return `${words_numbers.indexOf(el.reverseString()) + 1}`
                })

            const sum = (numbers_list[0] + last_numbers_list[0])

            fs.writeFileSync(final_input_response_file_name, `${fs.readFileSync(final_input_response_file_name, decoding_option).makeReadableFileData()}\n${el}\n${sum}`)

            return sum
        })
        .reduce((counter, curr_el) => counter += +curr_el, 0)

    fs.writeFileSync(final_input_response_file_name, `${fs.readFileSync(final_input_response_file_name, decoding_option).makeReadableFileData()}\n${filtered_input}`)

    return filtered_input
}

console.log(first_sum(final_input))
