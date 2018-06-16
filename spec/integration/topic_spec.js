   describe("POST /topics/:id/update", () => {

     it("should update the topic with the given values", (done) => {
        const options = {
           url: `${base}${this.topic.id}/update`,
           form: {
             title: "JavaScript Frameworks",
             description: "There are a lot of them"
           }
         };
         request.post(options,
           (err, res, body) => {

           expect(err).toBeNull();
           Topic.findOne({
             where: { id: this.topic.id }
           })
           .then((topic) => {
             expect(topic.title).toBe("JavaScript Frameworks");
             done();
           });
         });
     });
   });
