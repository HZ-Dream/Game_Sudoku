const ai_Short = document.querySelector("#btn-suggest__short");
let flag_Short = true;
let index_Short = -1;
let suggestionState = {};

ai_Short.addEventListener("click", () => {
    if (su_helpPoint > 0) {
        cells.forEach((e, index) => {
            if (e.classList.contains('selected') && cells[index] !== 0) {
                index_Short = index;
                flag_Short = false;
            }
        });

        if (flag_Short) {
            cells.forEach(e => {
                if (!e.classList.contains('filled')) {
                    e.classList.add('hover');
                }
            });

            setTimeout(() => {
                cells.forEach(e => e.classList.remove('hover'));
            }, 2000);
        } else {
            su_helpPoint--;

            let row_Short = Math.floor(index_Short / CONSTANT.GRID_SIZE);
            let col_Short = index_Short % CONSTANT.GRID_SIZE;
            let arr_Short = getPossibleValues(su_answer, row_Short, col_Short);
            
            if (!suggestionState[index_Short]) {
                suggestionState[index_Short] = { suggestions: arr_Short, currentIndex: 0 };
            }

            let currentSuggestion = suggestionState[index_Short].suggestions[suggestionState[index_Short].currentIndex];

            if (arr_Short.length == 0) {
                cells[index_Short].innerHTML = "";
                cells[index_Short].setAttribute('data-value', "");
            } else {
                cells[index_Short].innerHTML = currentSuggestion;
                cells[index_Short].setAttribute('data-value', currentSuggestion);
                cells[index_Short].classList.add('suggested');
                su_answer[row_Short][col_Short] = currentSuggestion;

                suggestionState[index_Short].currentIndex = (suggestionState[index_Short].currentIndex + 1) % arr_Short.length;
            }
            saveGameInfo();
        }
    }
});