// ==UserScript==
// @name         AO3 Button Click Confirmation Dialog
// @namespace    https://auska.works/
// @version      3
// @description  Adds a confirmation dialog before posting a chapter on AO3.
// @author       Auska (https://auska.works)
// @copyright    2021, Auska (https://auska.works)
// @license      The Hippocratic License v. 2.1; https://firstdonoharm.dev/version/2/1/license/
// @icon         https://www.google.com/s2/favicons?domain=archiveofourown.org
// @grant        none
// @match        https://archiveofourown.org/works/*
// ==/UserScript==

(function() {
    'use strict';

    let propagateIfConfirmed = (e) => {
        let isConfirmed = confirm('Are you sure you want to post this chapter?');

        if (isConfirmed) {
            // Onward to normal processing!
            return;
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
        makePostButtonLookDangerous(currentViewPostButton);
        addConfirmationDialogBeforePosting(currentViewPostButton);
    }

})();
