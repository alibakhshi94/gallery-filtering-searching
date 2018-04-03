(function () {
    $('input:text').mouseover( // Romove value when mouse over
        function () {
            $(this).val('');
        });
    $('input:text').mouseleave( // Set value when mouse leave
        function () {
            $(this).val('Search');
        }
    );
}());
(function () {

    var $imgs = $('#gallery img');                  // Store all images
    var $buttons = $('#buttons');                   // Store buttons element
    var tagged = {};                                // Create tagged object

    $imgs.each(function () {                         // Loop through images and
        var img = this;                               // Store img in variable
        var tags = $(this).data('tags');              // Get this element's tags

        if (tags) {                                   // If the element had tags
            tags.split(',').forEach(function (tagName) { // Split at comma and
                if (tagged[tagName] == null) {            // If object doesn't have tag
                    tagged[tagName] = [];                   // Add empty array to object
                }
                tagged[tagName].push(img);                // Add the image to the array
            });
        }
    });

    $('<button/>', {                                 // Create empty button
        text: 'Show All',                              // Add text 'show all'
        class: 'active',                               // Make it active
        click: function () {                            // Add onclick handler to
            $(this)                                      // Get the clicked on button
                .addClass('active')                        // Add the class of active
                .siblings()                                // Get its siblings
                .removeClass('active');                    // Remove active from siblings
            $imgs.show();                                // Show all images
        }
    }).appendTo($buttons);                           // Add to buttons

    $.each(tagged, function (tagName) {               // For each tag name
        $('<button/>', {                               // Create empty button
            text: tagName + ' (' + tagged[tagName].length + ')', // Add tag name
            click: function () {                          // Add click handler
                $(this)                                    // The button clicked on
                    .addClass('active')                      // Make clicked item active
                    .siblings()                              // Get its siblings
                    .removeClass('active');                  // Remove active from siblings
                $imgs                                      // With all of the images
                    .hide()                                  // Hide them
                    .filter(tagged[tagName])                 // Find ones with this tag
                    .show();                                 // Show just those images
            }
        }).appendTo($buttons);                         // Add to the buttons
    });
}());

(function () {                             // Lives in an IIFE
    var $imgs = $('#gallery img');          // Get the images
    var $search = $('#filter-search');      // Get the input element
    var cache = [];                         // Create an array called cache

    $imgs.each(function () {                 // For each image
        cache.push({                          // Add an object to the cache array
            element: this,                      // This image
            text: this.alt.trim().toLowerCase() // Its alt text (lowercase trimmed)
        });
    });

    function filter() {                     // Declare filter() function
        var query = this.value.trim().toLowerCase();  // Get the query
        cache.forEach(function (img) {         // For each entry in cache pass image 
            var index = 0;                      // Set index to 0

            if (query) {                        // If there is some query text
                index = img.text.indexOf(query);  // Find if query text is in there
            }

            img.element.style.display = index === -1 ? 'none' : '';  // Show / hide
        });
    }

    if ('oninput' in $search[0]) {          // If browser supports input event
        $search.on('input', filter);          // Use input event to call filter()
    } else {                                // Otherwise
        $search.on('keyup', filter);          // Use keyup event to call filter()
    }

}());