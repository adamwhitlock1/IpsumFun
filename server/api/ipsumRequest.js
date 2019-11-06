function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function createParagraph(words, dict) {
  let paragraphText = ''
  for (let ii = 0; ii < parseFloat(words); ii++) {
    const randomWord = dict[randomIntFromInterval(0, dict.length - 1)]
    if (ii === 0) {
      paragraphText += randomWord
    } else {
      paragraphText += ' ' + randomWord
    }
  }
  return paragraphText
}

function paragraphLength(length, numberOfWords) {
  let words = 10
  switch (length) {
    case 'short':
      words = randomIntFromInterval(10, 20)
      break
    case 'medium':
      words = randomIntFromInterval(20, 35)
      break
    case 'long':
      words = randomIntFromInterval(35, 60)
      break
    case 'custom':
      words = numberOfWords
      break
  }
  return words
}

function createResponse(paragraphs, dict, length, numberOfWords) {
  let responseText = ''

  for (let i = 0; i < parseFloat(paragraphs); i++) {
    const words = paragraphLength(length, numberOfWords)
    const paragraphText = createParagraph(words, dict)
    if (i === 0) {
      responseText += paragraphText
    } else {
      responseText += '\n\n' + paragraphText
    }
  }
  return responseText
}

export function ipsumRequest(req, res, dict) {
  if (!req.query.p) {
    res.status('400').json({
      status: 'Error',
      message: 'Paragraph qty requires as a query parameter ex: "p=5"'
    })
  } else {
    res.json({
      dictLength: dict.length,
      text: createResponse(req.query.p, dict, req.query.l, req.query.w)
    })
  }
}
