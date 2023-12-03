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

                const { red, blue, green  } = counter

                counter.multiple = red * blue * green

                return counter
            }, { })
        )
        .reduce((counter, curr_el) => counter += +curr_el.multiple, 0)

    return games_list
}

console.log(do_second_sum(final_input_data))
