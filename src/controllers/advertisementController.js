const advertisementQueries = require("../db/queries.advertisements.js");

module.exports = {
  index(req, res, next){
    advertisementQueries.getAllAdvertisements((err, advertisements) => {
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("advertisements/index", {advertisements});
        }
     })
  },

  new(req, res, next){
      res.render("advertisements/new");
  },

   create(req, res, next){
     let newAdvertisement = {
       title: req.body.title,
       description: req.body.description
     };
     advertisementQueries.addAdvertisement(newAdvertisement, (err, advertisement) => {
       if(err){
         res.redirect(500, "/advertisements/new");
       } else {
         res.redirect(303, `/advertisements/${advertisement.id}`);
       }
     });
   },

   show(req, res, next){
     advertisementQueries.getAdvertisement(req.params.id, (err, advertisement) => {
       if(err || advertisement == null){
         res.redirect(404, "/");
       } else {
         res.render("advertisements/show", {advertisement});
       }
     });
   },

   edit(req, res, next){
     advertisementQueries.getAdvertisement(req.params.id, (err, advertisement) => {
       if(err || advertisement == null){
         res.redirect(404, "/");
       } else {
         res.render("advertisements/edit", {advertisement});
       }
     });
   },

   update(req, res, next){
     advertisementQueries.updateAdvertisement(req.params.id, req.body, (err, advertisement) => {
       if(err || advertisement == null){
         res.redirect(404, `/advertisements/${req.params.id}/edit`);
       } else {
         res.redirect(`/advertisements/${advertisement.id}`);
       }
     });
   },

   destroy(req, res, next){
     advertisementQueries.deleteAdvertisement(req.params.id, (err, advertisement) => {
       if(err){
         res.redirect(500, `/advertisements/${advertisement.id}`)
       } else {
         res.redirect(303, "/advertisements")
       }
     });
   }
}
