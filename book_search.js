/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {

    matchingLines = []
    
    // Loop through each book in input object
    for (let i = 0; i < scannedTextObj.length; i++) {
        // Validate book structure
        book = scannedTextObj[i]
        if (!book || typeof book !== 'object' || !Array.isArray(book.Content)) {
            throw new Error('Invalid book data format');
          }
        // Loop through each content entry in each book
        for (let i = 0; i < book.Content.length; i++) {
            entry = book.Content[i]
            // Validate content entry structure
            if (
                !entry ||
                typeof entry !== 'object' ||
                typeof entry.Page !== 'number' ||
                typeof entry.Line !== 'number' ||
                typeof entry.Text !== 'string'
              ) {
                throw new Error('Invalid content entry format');
              }
            // Check if the search term is present in the text
            if (entry.Text.includes(searchTerm)) {
                // If found, add the matching line to the result
                matchingLines.push({
                    ISBN: book.ISBN,
                    Page: entry.Page,
                    Line: entry.Line,
                });
            }
        }
    }

    var result = {
        "SearchTerm": searchTerm,
        "Results": matchingLines
    };
    
    if (searchTerm == "") {
        result = "Empty search term."
    }

    if (scannedTextObj.length == 0) {
        result = "Empty input search object."
    }
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}


/* Further Unit Testing */
// validate positive test
const positiveTest = findSearchTermInBooks("and", twentyLeaguesIn);
if (positiveTest.Results.length == 2) {
    console.log("PASS: Developer Test 1");
} else {
    console.log("FAIL: Developer Test 1");
    console.log("Expected Length: 2");
    console.log("Received:", positiveTest.Results.length);
}
// validate test where it will not find anything
const negativeTest = findSearchTermInBooks("American", twentyLeaguesIn);
if (negativeTest.Results.length == 0) {
    console.log("PASS: Developer Test 2");
} else { 
    console.log("FAIL: Developer Test 2");
    console.log("Expected Length: 0");
    console.log("Received:", negativeTest.Results.length);
}

const twentyLeaguesCasesOut = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}
// validate case sensitivity
const caseSensitiveTest = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesCasesOut) === JSON.stringify(caseSensitiveTest)) {
    console.log("PASS: Developer Test 3");
} else {
    console.log("FAIL: Developer Test 3");
    console.log("Expected:", twentyLeaguesCasesOut);
    console.log("Received:", caseSensitiveTest);
}

// Boundary tests
const emptyExpected = "Empty search term."
const emptySearchTerm = findSearchTermInBooks("", twentyLeaguesIn);
if (emptySearchTerm == emptyExpected) {
    console.log("PASS: Developer Test 4");
} else {
    console.log("FAIL: Developer Test 4");
    console.log("Expected:", emptyExpected);
    console.log("Received:", emptySearchTerm);
}

const emptyBooks = []
const emptyBooksTest = findSearchTermInBooks("The", emptyBooks);
if (emptyBooksTest == "Empty input search object.") {
    console.log("PASS: Developer Test 5");
} else {a
    console.log ("FAIL: Developer Test 5");
    console.log("Expected Length: 0");
    console.log("Received Length:", emptyBooksTest);
}

// validate findSearchTermInBooks() works for finding multiples occurences
const multipleMatches = findSearchTermInBooks('he', twentyLeaguesIn);
const multipleExpected = {
    SearchTerm: 'he',
    Results: [
      { ISBN: '9780000528531', Page: 31, Line: 8 },
      { ISBN: '9780000528531', Page: 31, Line: 9 },
      { ISBN: '9780000528531', Page: 31, Line: 10 }
    ]
  }
if (JSON.stringify(multipleExpected) == JSON.stringify(multipleMatches)){
    console.log("PASS: Developer Test 6");
} else {
    console.log("FAIL: Developer Test 6");
    console.log("Expected:", multipleExpected);
    console.log("Received:", multipleMatches);
}

// Validate findSearchTermInBooks() works for non alphanumeric characters
const nonAlpha = findSearchTermInBooks(';', twentyLeaguesIn);
const nonAlphaOut = {
    SearchTerm: ';',
    Results: [ { ISBN: '9780000528531', Page: 31, Line: 9 } ]
  }
if (JSON.stringify(nonAlphaOut) == JSON.stringify(nonAlpha)) {
    console.log("PASS: Developer Test 7");
} else {
    console.log("FAIL: Developer Test 7");
    console.log("Expected:", nonAlphaOut);
    console.log("Received:", nonAlpha);
}

// Validate that error catches are working in findSearchTermInBooks()
const errorTwenty = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": "31",
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
try {
    const errorOut = findSearchTermInBooks("the", errorTwenty);
} catch (err) {
    console.log("PASS: Developer Test 8");
    console.log("error successfully caught:", err.message);
}
