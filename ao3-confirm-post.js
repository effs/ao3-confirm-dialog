// ==UserScript==
// @name         AO3 Post Confirmation Dialog
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a confirmation dialog before posting a chapter on AO3.
// @author       https://github.com/effs
// @match        https://archiveofourown.org/works/*/chapters/*
// @icon         https://www.google.com/s2/favicons?domain=archiveofourown.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let propagateIfConfirmed = (e) => {
        let isConfirmed = confirm('Are you sure you want to post this chapter?');

        if (isConfirmed) {
            alert('Would have been submitted');
        }

        // Do nothing if canceled
        e.preventDefault();
        e.stopPropagation();
        return;
    };

    let addConfirmationDialogBeforePosting = (button) => {
        button.addEventListener('click', propagateIfConfirmed);
    };

    let makePostButtonLookDangerous = (button) => {
        button.value = '⚠️ ' + button.value;
        button.style.border = '1px solid #f88';
        button.style.background = '#f00';
        button.style.color = '#eee';
    };

    // Just work with the post buttons, no need to mess with anything else
    let newChapterViewPostButton = document.querySelector('input[name=post_without_preview_button]');
    let previewViewPostButton = document.querySelector('input[name=post_button]');
    let draftViewPostButton = document.querySelector('div#chapters input[name=commit]'); // The chapter index Go-button is also name=commit…
    let editViewPostButton = document.querySelector('input[name=update_button]');

    let currentViewPostButton = newChapterViewPostButton || previewViewPostButton || draftViewPostButton || editViewPostButton;

    if (currentViewPostButton) {
console.log({currentViewPostButton});
        makePostButtonLookDangerous(currentViewPostButton);
        addConfirmationDialogBeforePosting(currentViewPostButton);
    }

})();
