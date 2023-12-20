const express = require("express")
const shortid = require("shortid")
const { shortModel } = require("../models/shortener.model")
const { auth } = require("../middleware/auth.middleware")

const shortRouter = express.Router()

shortRouter.post("/shorten",auth,async(req,res)=>{
    const {url} = req.body;
    try {
        if (!url) {
            return res.status(401).send({ error: 'plz provied URL in body' });
          }

        const shortID = shortid.generate()
        await shortModel.create({
            shortId:shortID,
            redirectUrl:url
        })

        const entry = await shortModel.findOne({ shortId: shortID })
        const shortURL = `${req.protocol}://${req.get('host')}/${shortID}`;
        res.status(200).send({url:url,shortURL:shortURL})
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

shortRouter.get('/:shortID', async (req, res) => {
    const { shortID } = req.params;
    try {
      const entry = await shortModel.findOne({ shortId: shortID });
  
      if (!entry) {
        return res.status(404).send({ error: 'URL not found' });
      }
  
      
      res.redirect(entry.redirectUrl);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

module.exports ={shortRouter}