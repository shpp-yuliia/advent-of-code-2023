import * as fs from "fs";

const final_input_name = 'final-input.txt'

const final_input_data = fs.readFileSync(final_input_name, 'utf8')

function do_second_sum(input) {
    const games_list = input
        .split('\n')
        .filter(el => el !== '')
        .map((el, index) => el
            .match((/[0-9]+ (blue|red|green)/gm))
            .sort((pre_box, curr_box) => {
                const pre_box_color = pre_box.split(' ')[1][0].charCodeAt()
                const curr_box_color = curr_box.split(' ')[1][0].charCodeAt()
                return pre_box_color - curr_box_color
            })
            .reduce((counter, curr_el) => {
                const curr_color = curr_el.match(/(blue|red|green)/gm)[0]
                const curr_box_amount = +(curr_el.match(/[0-9]+/gm)[0])

                const counter_curr_color_data = counter[curr_color]
                if (!counter_curr_color_data) counter[curr_color] = curr_box_amount
                if (counter_curr_color_data) {
                    if (curr_box_amount > counter_curr_color_data) counter[curr_color] = curr_box_amount
                }

                counter.id = index + 1

                return counter
            }, { })
        )
        .filter(el => {
            const { blue, green, red } = el

            let isValid = true

            if (blue > 14) { isValid = false }
            if (green > 13) { isValid = false }
            if (red > 12) { isValid = false  }

            return isValid
        })
        .reduce((counter, curr_el) => counter += +curr_el.id, 0)

    return games_list
}

console.log(do_second_sum(final_input_data))
