import { photoDict } from '../dictionary/photo'
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function createParagraph(words) {
  let paragraphText = ''
  for (let ii = 0; ii < parseFloat(words); ii++) {
    const randomWord = photoDict[randomIntFromInterval(0, photoDict.length - 1)]
    if (ii === 0) {
      paragraphText += randomWord
    } else {
      paragraphText += ' ' + randomWord
    }
  }
  return paragraphText
}

function createResponse(paragraphs) {
  let responseText = ''
  for (let i = 0; i < parseFloat(paragraphs); i++) {
    const words = randomIntFromInterval(20, 50)
    const paragraphText = createParagraph(words)
    if (i === 0) {
      responseText += paragraphText
    } else {
      responseText += '\n\n' + paragraphText
    }
  }
  return responseText
}

export function photoRequest(req, res, words) {
  if (!req.query.p) {
    res.status('400').json({
      status: 'Error',
      message: 'Paragraph qty requires as a query parameter ex: "p=5"'
    })
  } else {
    res.json({
      dictLength: photoDict.length,
      text: createResponse(req.query.p)
    })
  }
}
