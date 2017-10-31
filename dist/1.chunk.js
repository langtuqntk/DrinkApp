webpackJsonpac__name_([1],{

/***/ 1338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__posts_module__ = __webpack_require__(1939);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PostsModule", function() { return __WEBPACK_IMPORTED_MODULE_0__posts_module__["a"]; });



/***/ }),

/***/ 1353:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(19);
var debounceTime_1 = __webpack_require__(599);
Observable_1.Observable.prototype.debounceTime = debounceTime_1.debounceTime;
//# sourceMappingURL=debounceTime.js.map

/***/ }),

/***/ 1362:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(19);
var map_1 = __webpack_require__(212);
Observable_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ }),

/***/ 1370:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an element was queried at a certain index of an
 * Observable, but no such index or position exists in that sequence.
 *
 * @see {@link elementAt}
 * @see {@link take}
 * @see {@link takeLast}
 *
 * @class ArgumentOutOfRangeError
 */
var ArgumentOutOfRangeError = (function (_super) {
    __extends(ArgumentOutOfRangeError, _super);
    function ArgumentOutOfRangeError() {
        var err = _super.call(this, 'argument out of range');
        this.name = err.name = 'ArgumentOutOfRangeError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ArgumentOutOfRangeError;
}(Error));
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
//# sourceMappingURL=ArgumentOutOfRangeError.js.map

/***/ }),

/***/ 1419:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(19);
var take_1 = __webpack_require__(1523);
Observable_1.Observable.prototype.take = take_1.take;
//# sourceMappingURL=take.js.map

/***/ }),

/***/ 1523:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(33);
var ArgumentOutOfRangeError_1 = __webpack_require__(1370);
var EmptyObservable_1 = __webpack_require__(156);
/**
 * Emits only the first `count` values emitted by the source Observable.
 *
 * <span class="informal">Takes the first `count` values from the source, then
 * completes.</span>
 *
 * <img src="./img/take.png" width="100%">
 *
 * `take` returns an Observable that emits only the first `count` values emitted
 * by the source Observable. If the source emits fewer than `count` values then
 * all of its values are emitted. After that, it completes, regardless if the
 * source completes.
 *
 * @example <caption>Take the first 5 seconds of an infinite 1-second interval Observable</caption>
 * var interval = Rx.Observable.interval(1000);
 * var five = interval.take(5);
 * five.subscribe(x => console.log(x));
 *
 * @see {@link takeLast}
 * @see {@link takeUntil}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * @param {number} count The maximum number of `next` values to emit.
 * @return {Observable<T>} An Observable that emits only the first `count`
 * values emitted by the source Observable, or all of the values from the source
 * if the source emits fewer than `count` values.
 * @method take
 * @owner Observable
 */
function take(count) {
    if (count === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else {
        return this.lift(new TakeOperator(count));
    }
}
exports.take = take;
var TakeOperator = (function () {
    function TakeOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    TakeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeSubscriber(subscriber, this.total));
    };
    return TakeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeSubscriber = (function (_super) {
    __extends(TakeSubscriber, _super);
    function TakeSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
    }
    TakeSubscriber.prototype._next = function (value) {
        var total = this.total;
        var count = ++this.count;
        if (count <= total) {
            this.destination.next(value);
            if (count === total) {
                this.destination.complete();
                this.unsubscribe();
            }
        }
    };
    return TakeSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=take.js.map

/***/ }),

/***/ 1547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditPostComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_apollo_angular__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__graphql_queries__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__graphql_mutations__ = __webpack_require__(595);








var EditPostComponent = (function () {
    function EditPostComponent(formBuilder, route, router, apollo) {
        this.route = route;
        this.router = router;
        this.apollo = apollo;
        this.form = formBuilder.group({
            title: ['', [
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required,
                ]],
            content: ['']
        });
        this.apollo = apollo;
    }
    EditPostComponent.prototype.ngOnInit = function () {
        var _this = this;
        var that = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.apollo.watchQuery({
            query: __WEBPACK_IMPORTED_MODULE_5__graphql_queries__["a" /* GetPostDetailQuery */],
            variables: { "id": this.id }
        }).subscribe(function (_a) {
            var data = _a.data;
            that.post = data.post;
            _this.form.setValue({ title: data.post.title, content: data.post.content });
        });
    };
    EditPostComponent.prototype.save = function () {
        var _this = this;
        if (!this.form.valid)
            return;
        this.apollo.mutate({
            mutation: __WEBPACK_IMPORTED_MODULE_6__graphql_mutations__["a" /* UpdatePostMutation */],
            variables: {
                "id": this.post.id,
                "data": {
                    "title": this.form.value.title,
                    "content": this.form.value.content
                }
            },
        })
            .take(1)
            .subscribe({
            next: function (_a) {
                var data = _a.data;
                console.log('edit post', data);
                // get edit data      
                _this.router.navigate(['/posts']);
            }, error: function (errors) {
                console.log('there was an error sending the query', errors);
            }
        });
    };
    return EditPostComponent;
}());
EditPostComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'edit-post',
        template: __webpack_require__(2404),
        styles: [__webpack_require__(2673)]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
        __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */],
        __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */],
        __WEBPACK_IMPORTED_MODULE_4_apollo_angular__["b" /* Apollo */]])
], EditPostComponent);



/***/ }),

/***/ 1548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewPostComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_apollo_angular__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__graphql_queries__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__graphql_mutations__ = __webpack_require__(595);







var NewPostComponent = (function () {
    function NewPostComponent(formBuilder, router, apollo) {
        this.router = router;
        this.apollo = apollo;
        this.form = formBuilder.group({
            title: ['', [
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required,
                ]],
            content: ['']
        });
        this.apollo = apollo;
    }
    NewPostComponent.prototype.save = function () {
        var _this = this;
        if (!this.form.valid)
            return;
        this.apollo.mutate({
            mutation: __WEBPACK_IMPORTED_MODULE_6__graphql_mutations__["b" /* AddPostMutation */],
            variables: {
                "data": {
                    "title": this.form.value.title,
                    "content": this.form.value.content
                }
            },
            refetchQueries: [{
                    query: __WEBPACK_IMPORTED_MODULE_5__graphql_queries__["b" /* GetPostsQuery */],
                }],
        })
            .take(1)
            .subscribe({
            next: function (_a) {
                var data = _a.data;
                console.log('got a new post', data);
                // get new data      
                _this.router.navigate(['/posts']);
            }, error: function (errors) {
                console.log('there was an error sending the query', errors);
            }
        });
    };
    return NewPostComponent;
}());
NewPostComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'new-post',
        template: __webpack_require__(2405),
        styles: [__webpack_require__(2674)]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
        __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */],
        __WEBPACK_IMPORTED_MODULE_4_apollo_angular__["b" /* Apollo */]])
], NewPostComponent);



/***/ }),

/***/ 1549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return postDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_apollo_angular__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__ = __webpack_require__(1353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(1362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_take__ = __webpack_require__(1419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__graphql_queries__ = __webpack_require__(591);










var postDetailComponent = (function () {
    // Inject Angular2Apollo service
    function postDetailComponent(apollo, route) {
        this.route = route;
        this.pageTitle = 'Post detail:';
        this.postControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]();
        // Observable variable of the graphql query
        this.nameFilter = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.apollo = apollo;
    }
    postDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.apollo.watchQuery({
            query: __WEBPACK_IMPORTED_MODULE_9__graphql_queries__["a" /* GetPostDetailQuery */],
            variables: { "id": this.id }
        }).subscribe(function (_a) {
            var data = _a.data;
            _this.post = data.post;
        });
    };
    postDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    return postDetailComponent;
}());
postDetailComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__(2406),
        styles: [__webpack_require__(2675)]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_apollo_angular__["b" /* Apollo */], __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* ActivatedRoute */]])
], postDetailComponent);



/***/ }),

/***/ 1550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__posts_service__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__ = __webpack_require__(1353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(1362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_take__ = __webpack_require__(1419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_take__);









var PostListComponent = (function () {
    // Inject Angular2Apollo service
    function PostListComponent(_postService, snackBar) {
        this._postService = _postService;
        this.snackBar = snackBar;
        this.postControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]();
        this.nameFilter = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
    }
    PostListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.posts = this._postService.get();
        // Add debounce time to wait 300 ms for a new change instead of keep hitting the server
        this.postControl.valueChanges.debounceTime(300).subscribe(function (name) {
            _this.nameFilter.next(name);
        });
    };
    PostListComponent.prototype.deletePost = function (id) {
        var _this = this;
        this._postService.delete(id)
            .then(function (response) {
            _this.openSnackBar(response.message, 'Delete');
            _this.posts.refetch();
        })
            .catch(function (error) {
            _this.openSnackBar(error.message, 'Delete');
        });
    };
    PostListComponent.prototype.openSnackBar = function (message, action) {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    };
    return PostListComponent;
}());
PostListComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'post-list',
        template: __webpack_require__(2407),
        styles: [__webpack_require__(2676)]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__posts_service__["a" /* PostsService */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["h" /* MatSnackBar */]])
], PostListComponent);



/***/ }),

/***/ 1938:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostsFilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);


var PostsFilterPipe = (function () {
    function PostsFilterPipe() {
    }
    PostsFilterPipe.prototype.transform = function (value, filtetBy) {
        filtetBy = filtetBy ? filtetBy.toLocaleLowerCase() : null; //search in each product if is the same
        return filtetBy ? value.filter(function (post) { return post.title.toLocaleLowerCase().indexOf(filtetBy) !== -1; }) : value;
    };
    return PostsFilterPipe;
}());
PostsFilterPipe = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"])({
        name: 'postsFilter'
    })
], PostsFilterPipe);



/***/ }),

/***/ 1939:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__posts_routes__ = __webpack_require__(1940);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__post_list_post_list_component__ = __webpack_require__(1550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__post_detail_post_detail_component__ = __webpack_require__(1549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__new_post_new_post_component__ = __webpack_require__(1548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__edit_post_edit_post_component__ = __webpack_require__(1547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__posts_filter_posts_filter_pipe__ = __webpack_require__(1938);













var PostsModule = (function () {
    function PostsModule() {
    }
    return PostsModule;
}());
PostsModule.routes = __WEBPACK_IMPORTED_MODULE_7__posts_routes__["a" /* routes */];
PostsModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        declarations: [
            /**
             * Components / Directives/ Pipes
             */
            __WEBPACK_IMPORTED_MODULE_8__post_list_post_list_component__["a" /* PostListComponent */],
            __WEBPACK_IMPORTED_MODULE_10__new_post_new_post_component__["a" /* NewPostComponent */],
            __WEBPACK_IMPORTED_MODULE_11__edit_post_edit_post_component__["a" /* EditPostComponent */],
            __WEBPACK_IMPORTED_MODULE_12__posts_filter_posts_filter_pipe__["a" /* PostsFilterPipe */],
            __WEBPACK_IMPORTED_MODULE_9__post_detail_post_detail_component__["a" /* postDetailComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_7__posts_routes__["a" /* routes */]),
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MatCardModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["c" /* MatListModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["e" /* MatInputModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["f" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["g" /* MatSnackBarModule */]
            // ApolloModule.forRoot(client)
        ],
    })
], PostsModule);



/***/ }),

/***/ 1940:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__post_list_post_list_component__ = __webpack_require__(1550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__new_post_new_post_component__ = __webpack_require__(1548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_post_edit_post_component__ = __webpack_require__(1547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__post_detail_post_detail_component__ = __webpack_require__(1549);




var routes = [
    {
        path: '', children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_0__post_list_post_list_component__["a" /* PostListComponent */] },
            { path: 'post-detail/:id', component: __WEBPACK_IMPORTED_MODULE_3__post_detail_post_detail_component__["a" /* postDetailComponent */] },
            { path: 'new', component: __WEBPACK_IMPORTED_MODULE_1__new_post_new_post_component__["a" /* NewPostComponent */] },
            { path: 'edit/:id', component: __WEBPACK_IMPORTED_MODULE_2__edit_post_edit_post_component__["a" /* EditPostComponent */] }
        ]
    },
];


/***/ }),

/***/ 2085:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 2086:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, ".postDetail {\n  width: 70%;\n  margin: auto; }\n", ""]);

// exports


/***/ }),

/***/ 2087:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, ".post {\n  width: 70%;\n  margin: auto; }\n  .post .title {\n    font-weight: bold; }\n", ""]);

// exports


/***/ }),

/***/ 2088:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, ".posts {\n  width: 70%;\n  margin: auto; }\n  .posts .addBtn {\n    float: right; }\n", ""]);

// exports


/***/ }),

/***/ 2404:
/***/ (function(module, exports) {

module.exports = "<div class=\"postDetail\">\n    <div *ngIf=\"post\">\n        <h5>Edit post:</h5>\n        <form [formGroup]=\"form\" (ngSubmit)=\"save()\">\n            <mat-input-container>\n                <input matInput formControlName=\"title\"  placeholder=\"Title\">\n                <mat-error>This field is required</mat-error>\n            </mat-input-container><br>\n            <mat-input-container>\n                <textarea matInput mat-autosize minRows=\"6\" placeholder=\"Your post content...\" formControlName=\"content\"></textarea>\n            </mat-input-container>\n            <button mat-raised-button type=\"submit\">Save</button>\n        </form>\n    </div>\n</div>"

/***/ }),

/***/ 2405:
/***/ (function(module, exports) {

module.exports = "<div class=\"postDetail\">\n    <h5>Add new post:</h5>\n    <form [formGroup]=\"form\" (ngSubmit)=\"save()\">\n        <mat-input-container>\n            <input matInput formControlName=\"title\" placeholder=\"Title\">\n            <mat-error>This field is required</mat-error>\n        </mat-input-container><br>\n        <mat-input-container>\n            <textarea matInput mat-autosize minRows=\"6\" placeholder=\"Your post content...\" formControlName=\"content\"></textarea>\n        </mat-input-container>\n        <button mat-raised-button type=\"submit\">Save</button>\n    </form>\n</div>"

/***/ }),

/***/ 2406:
/***/ (function(module, exports) {

module.exports = "<div class=\"post\"> \n    <h2>{{pageTitle}}</h2>\n    <div *ngIf=\"post\">\n        <mat-card>\n            <mat-card-header>\n                <mat-card-title class=\"title\">{{post.title }}</mat-card-title>\n                <mat-card-subtitle>_________________________</mat-card-subtitle>\n            </mat-card-header>\n            <mat-card-content>\n                <p>{{post.content}}</p>\n            </mat-card-content>\n        </mat-card>\n    </div>\n\n</div>"

/***/ }),

/***/ 2407:
/***/ (function(module, exports) {

module.exports = "<div class=\"posts\">\n        <p>The post list is composed by the angular components querying the GraphQL and displaying the result</p>\n        \n    <div aria-flowto=\"<left></left>\">\n        <h2>Posts list</h2>\n        <button class=\"addBtn\" mat-fab [routerLink]=\"['/posts/new']\"> <mat-icon>add</mat-icon></button>\n        <br>\n    </div>\n    <mat-input-container>\n        <input matInput type=\"search\" [(ngModel)]='listPostFilter' [formControl]=\"postControl\" placeholder=\"search...\">\n    </mat-input-container>\n    <mat-card *ngFor=\"let post of posts | async | postsFilter:listPostFilter\">\n        <mat-list>\n            <mat-list-item>\n                <a mat-line [routerLink]=\"['/posts/post-detail', post.id]\"> {{post.title}} </a>\n                <p mat-line>\n                    <span>{{post.content}}</span>\n                </p>\n                <span><button mat-button (click)='deletePost(post.id)'><mat-icon>delete</mat-icon></button></span>\n                <span><button mat-button [routerLink]=\"['/posts/edit', post.id]\"><mat-icon>edit</mat-icon></button></span>\n            </mat-list-item>\n        </mat-list>\n    </mat-card>\n</div>\n"

/***/ }),

/***/ 2673:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2085);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2674:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2086);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2675:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2087);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2676:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2088);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ })

});
//# sourceMappingURL=1.chunk.js.map