/* jshint -W117 */

(function() {
    'use strict';

    var URL = '#';
    var mockProducts = './src/server/mockdata/product.json';
    var mockReviews = './src/server/mockdata/reviews.json';
    var loadLink = $('a.load-btn');
    var productCollection = [];
    var reviewsCollection = [];
    var productArray = [];
    var reviewsData = [];

    function init () {
        getProducts();
        getReviews();
    }

    var Review = function(productID, reviewID, author, feedback) {
        this.productID = productID;
        this.reviewID = reviewID;
        this.author = author;
        this.feedback = feedback;
    };

    var Product = function(id, name, value, description) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.description = description;
    };

    function createProduct(id, name, value, description) {
        var product = new Product(id, name, value, description);
        productCollection.push(product);
    }

    function createReviews(productID, reviewID, author, feedback) {
        var reviews = new Review(productID, reviewID, author, feedback);
        reviewsCollection.push(reviews);
    }

    function getProducts() {
        var getProductData = $.getJSON(mockProducts, function (data) {
            processProducts(data);
        });

        $.when(getProductData).then(function(storedProducts) {
            storedProducts = productCollection;
            buildProducts(productCollection);
        });
    }

    function getReviews() {
        var getReviewData = $.getJSON(mockReviews, function (data) {
            processReviews(data);
        });

        $.when(getReviewData).then(function(storedReviews) {
            storedReviews = reviewsCollection;
            parseReviews(reviewsCollection);
        });
    }

    function processProducts(productData) {
        for (var i = 0; i < productData.length; i++) {
            var productID = productData[i].id;
            var productName = productData[i].name;
            var productValue = productData[i].value;
            var productDescription = productData[i].description;

            createProduct(productID, productName, productValue, productDescription);
        }
    }

    function processReviews(reviewData) {
        for (var i = 0; i < reviewData.length; i++) {
            var relationID = reviewData[i].id;
            var theReviews = reviewData[i].reviews;

            for (var j = 0; j < theReviews.length; j++) {
                var reviewID = theReviews[j].id;
                var reviewAuthor = theReviews[j].author;
                var reviewFeedback = theReviews[j].feedback;

                createReviews(relationID, reviewID, reviewAuthor, reviewFeedback);
            }
        }
    }

    function buildProductRow(product) {
        var row = $('<tr />');
        $('.product-table tbody').append(row);
        row.append($('<td>' + product.id + '</td>'));
        row.append($('<td>' + product.name + '</td>'));
        row.append($('<td>' + product.value + '</td>'));
        row.append($('<td>' + product.description + '</td>'));
        row.append($('<td><a href="#" class="load-btn btn-sm btn-default" id="' + product.id + '">Read Reviews</a></td>'));
    }

    function buildReviewRow(review) {
        var row = $('<tr />');
        $('.review-table tbody').append(row);
        row.append($('<td>' + review.author + '</td>'));
        row.append($('<td>' + review.feedback + '</td>'));
    }

    function buildProducts(data) {
        for (var i = 0; i < data.length; i++) {
            buildProductRow(data[i]);
        }
    }

    function buildReviews(data) {
        for (var i = 0; i < data.length; i++) {
            buildReviewRow(data[i]);
        }
    }

    function parseReviews(data) {
        $('.product-table').on('click', loadLink, passedID);

        function passedID() {

            var targetID = event.target.id;
            $('.reviews').empty();

            for (var i = 0; i < reviewsCollection.length; i++) {
                if (reviewsCollection[i].productID === targetID) {
                    $('.reviews').append('<p class="well">Author: ' + reviewsCollection[i].author +
                    '<br />Feedback: ' + reviewsCollection[i].feedback + '</p>');
                }
            }
        }
    }

    init();
}());
