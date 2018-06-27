const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Post", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "Best Oil to Cook With",
                description: "A comparative study of the advantages and disadvantages of different cooking oils."
            })
            .then((topic) => {
                this.topic = topic;

                Post.create({
                    title: "The best oil to cook with is canola,",
                    body: "its neutral taste and high smoke point compel it to be king in heat-based applications.",
                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("#create()", () => {
        it("should create a topic object with a title and description", (done) => {

            Topic.create({
		title: "Importance of a high-smoke point in cooking oils",
                description: "Cooking oil past its smoke point can cause its good compounds to break down to harmful carcinogens and also cause it to taste rancid.",
            })
            .then((topic) => {
                expect(topic.title).toBe("Importance of a high-smoke point in cooking oils");
                expect(topic.description).toBe("Cooking oil past its smoke point can cause its good compounds to break down to harmful carcinogens and also cause it to taste rancid.");
                done();
            });
        });
        it("should not create a topic with missing title or description", (done) => {
            Topic.create({
                title: "Importance of a high-smoke point in cooking oils",
                description: "Cooking oil past its smoke point can cause its good compounds to break down to harmful carcinogens and also cause it to taste rancid.",

            })
            .then((topic) => {

                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Topic.title cannot be null");
                expect(err.message).toContain("Topic.description cannot be null");
                done();
            })
        });
    });
    
    describe("#getPosts()", () => {
        it("should return the associated posts", (done) => {

            this.topic.getPosts()
            .then((associatedPosts) => {
                expect(associatedPosts[0].title).toBe("The best oil to cook with is canola,");
                done();
            });
        });
    });
});
