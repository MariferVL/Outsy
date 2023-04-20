import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import * as auth from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-storage.js";
import { getFirestore, addDoc, collection, query, where, orderBy, getDocs, doc, updateDoc, deleteDoc, arrayUnion, getCountFromServer } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
const firebaseConfig = {
  apiKey: "AIzaSyAMoIZnaqiWN7MrGggAkrPwJqTMUN-_xXE",
  authDomain: "outsy-mxg.firebaseapp.com",
  databaseURL: "https://outsy-mxg-default-rtdb.firebaseio.com",
  projectId: "outsy-mxg",
  storageBucket: "",
  messagingSenderId: "1058170420655",
  appId: "1:1058170420655:web:06d17c4cc4440b35d0035a",
  measurementId: "G-MF6SX17B18"
};
const app = initializeApp(firebaseConfig);
const authApp$1 = auth.getAuth(app);
getDatabase(app);
function toggleSignIn(email2, password2) {
  if (auth.currentUser) {
    signOut(authApp$1);
  } else {
    auth.signInWithEmailAndPassword(authApp$1, email2, password2).then(function(userCredential) {
      return userCredential.user;
    }).catch(function(error) {
      const errorCode = error.code;
      if (errorCode === "auth/wrong-password") {
        return "Contrase\xF1a Err\xF3nea.";
      }
    });
  }
  document.getElementById("password-reset").addEventListener("click", () => auth.sendPasswordReset(authApp$1, email2));
}
function handleSignUp(email2, password2, userName) {
  console.log("username: ", userName);
  return auth.createUserWithEmailAndPassword(authApp$1, email2, password2).then((cred) => {
    const sendVerificationPromise = sendVerification(cred.user);
    const updateUserProfilePromise = auth.updateProfile(cred.user, {
      displayName: userName,
      photoURL: "https://firebasestorage.googleapis.com/v0/b/outsy-mxg.appspot.com/o/profileImages%2FdefaultProfile.png?alt=media&token=00d73d8f-2708-4910-8166-7160e80c8d5b"
    });
    return Promise.all([sendVerificationPromise, updateUserProfilePromise]).then(() => {
      return true;
    }).catch((error) => {
      throw error;
    });
  }).catch((error) => {
    const errorCode = error.code;
    if (errorCode == "auth/weak-password") {
      throw new Error("Password is too weak");
    } else {
      throw error;
    }
  });
}
function sendVerification(user) {
  auth.sendEmailVerification(user).then(function() {
    return user.emailVerified;
  }).catch((error) => {
    return `Error:  ${error}`;
  });
}
function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth.signInWithPopup(authApp$1, provider).then((result) => {
    const credential = auth.GoogleAuthProvider.credentialFromResult(result);
    credential.accessToken;
    result.user;
  }).catch((error) => {
    error.code;
    error.customData.email;
    auth.GoogleAuthProvider.credentialFromError(error);
  });
}
var runtime = { exports: {} };
(function(module) {
  var runtime2 = function(exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var defineProperty = Object.defineProperty || function(obj, key, desc) {
      obj[key] = desc.value;
    };
    var undefined$1;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });
      return generator;
    }
    exports.wrap = wrap;
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
      return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
    defineProperty(
      GeneratorFunctionPrototype,
      "constructor",
      { value: GeneratorFunction, configurable: true }
    );
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }
    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };
    exports.awrap = function(arg) {
      return { __await: arg };
    };
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value2) {
              invoke("next", value2, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }
          return PromiseImpl.resolve(value).then(function(unwrapped) {
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            return invoke("throw", error, resolve, reject);
          });
        }
      }
      var previousPromise;
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
      }
      defineProperty(this, "_invoke", { value: enqueue });
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0)
        PromiseImpl = Promise;
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
        return result.done ? result.value : iter.next();
      });
    };
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
          return doneResult();
        }
        context.method = method;
        context.arg = arg;
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel)
                continue;
              return delegateResult;
            }
          }
          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }
            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }
          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
            if (record.arg === ContinueSentinel) {
              continue;
            }
            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method;
      var method = delegate.iterator[methodName];
      if (method === undefined$1) {
        context.delegate = null;
        if (methodName === "throw" && delegate.iterator["return"]) {
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);
          if (context.method === "throw") {
            return ContinueSentinel;
          }
        }
        if (methodName !== "return") {
          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a '" + methodName + "' method"
          );
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }
      var info = record.arg;
      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }
      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        return info;
      }
      context.delegate = null;
      return ContinueSentinel;
    }
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    define(Gp, iteratorSymbol, function() {
      return this;
    });
    define(Gp, "toString", function() {
      return "[object Generator]";
    });
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
      this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
    exports.keys = function(val) {
      var object = Object(val);
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
      return function next() {
        while (keys.length) {
          var key2 = keys.pop();
          if (key2 in object) {
            next.value = key2;
            next.done = false;
            return next;
          }
        }
        next.done = true;
        return next;
      };
    };
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
        if (typeof iterable.next === "function") {
          return iterable;
        }
        if (!isNaN(iterable.length)) {
          var i = -1, next = function next2() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next2.value = iterable[i];
                next2.done = false;
                return next2;
              }
            }
            next2.value = undefined$1;
            next2.done = true;
            return next2;
          };
          return next.next = next;
        }
      }
      return { next: doneResult };
    }
    exports.values = values;
    function doneResult() {
      return { value: undefined$1, done: true };
    }
    Context.prototype = {
      constructor: Context,
      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);
        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
        return this.rval;
      },
      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          if (caught) {
            context.method = "next";
            context.arg = undefined$1;
          }
          return !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
          if (entry.tryLoc === "root") {
            return handle("end");
          }
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }
        return this.complete(record);
      },
      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
        return ContinueSentinel;
      },
      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName,
          nextLoc
        };
        if (this.method === "next") {
          this.arg = undefined$1;
        }
        return ContinueSentinel;
      }
    };
    return exports;
  }(
    module.exports
  );
  try {
    regeneratorRuntime = runtime2;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime2;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime2);
    }
  }
})(runtime);
const outsylogo = "/assets/outsylogo.9429228c.png";
const carrusela = "/assets/carrusela.c49f0a61.png";
const carruselb = "/assets/carruselb.f8fe9d04.png";
const carruselc = "/assets/carruselc.1bf36629.png";
const featuresa = "/assets/featuresa.5abf2b9e.png";
const featuresb = "/assets/featuresb.b18dabf6.png";
const featuresc = "/assets/featuresc.7c141006.png";
const testimonioa = "/assets/testimonioa.13cf8d67.png";
const testimoniob = "/assets/testimoniob.26954684.png";
const testimonioc = "/assets/testimonioc.a8cb5c7f.png";
const home = `
<!-- Navbar -->
<section id="base">
  <div class="container">
    <header id="home">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#home">
                <img src="${outsylogo}" alt="Logo Outsy" height="75">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="caracter\xEDsticas" href="#features">Caracter\xEDsticas</a>
                    </li>
                    <li class="nav-item">
                        <a id="about" class="nav-link" >Nosotros</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#testimonials">Testimonios</a>
                    </li>
                    <li class="nav-item">
                        <button id="signIn" type="button" class="btn-outsy">Inicia Sesi\xF3n</button>
                    </li>
                    <li class="nav-item">
                        <button id="signUp" type="button" class="btn-outsy">Registrate</button>
                    </li>
                    <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> -->
                    <!-- <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li> -->
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button  class="btn-search" type="submit">Search</button>
                </form>
            </div>
        </div>
      </nav>
    </header>
  </div>
  

  <!-- Home Section -->

    <section id="main" class="container-fluid position-relative p-0">
      <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true"
            aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${carrusela}" width="100%">
            <div class="container">
              <div class="carousel-caption text-start">
             
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img class="bd-placeholder-img" width="100%" height="100%" src="${carruselb}"
              aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
              <rect width="100%" height="100%" fill="#777" />
            <div class="container">
              <div class="carousel-caption">
              
              </div>
            </div>
          </div>
          <div class="carousel-item">
          <img class="bd-placeholder-img" width="100%" height="100%" src="${carruselc}"
          aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
          <rect width="100%" height="100%" fill="#777" />
            <div class="container">
              <div class="carousel-caption text-end">
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>
    <section id="Features">
      <!-- Marketing messaging and featurettes
  ================================================== -->
      <!-- Wrap the rest of the page in another container to center all the content. -->

      <div id="features" class="container marketing">
        <!-- START THE FEATURETES -->
        <div  class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading fw-normal lh-1">Reg\xEDstrate en Outsy<span class="text-muted"></span></h2>
            <p class="lead">Crea tu username, ingresa tu correo electr\xF3nico y crea una constrase\xF1a para unirte a 
            nuestra comunidad, \xA1Tus amigos est\xE1n esperando!</p>
          </div>
          <div class="col-md-5">
            <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
              height="500" src="${featuresa}" 
              preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa" dy=".3em"></text>
          </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
          <div class="col-md-7 order-md-2">
            <h2 class="featurette-heading fw-normal lh-1">Publica los planes que tienes en mente<span class="text-muted"></span></h2>
            <p class="lead">\xBFHay alguna pel\xEDcula que te encantar\xEDa ver o tu museo favorito tiene una exposici\xF3n por tiempo limitado? 
            \xA1Comp\xE1rtelo con tus amigos! Cu\xE9ntales tu plan y vayan juntos\u2026</p>
          </div>
          <div class="col-md-5 order-md-1">
            <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
              height="500" src="${featuresb}" 
              preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa" dy=".3em"></text>
          </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading fw-normal lh-1">\xA1No m\xE1s aburrimiento los fines de semana! <span
                class="text-muted"></span>
            </h2>
            <p class="lead">Descubre nuevas opciones para salir con tus amigos en Outsy. 
            Encuentra los mejores planes para pasar un buen rato juntos.</p>
          </div>
          <div class="col-md-5">
            <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
              height="500" src="${featuresc}" 
              preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa" dy=".3em"></text>
          </div>
        </div>
      </div><!-- /.container -->

      <hr class="featurette-divider">

    </section>

    <section id="testimonials">
      <article>
        <!-- Carousel wrapper -->
        <div id="usersTestimonials" class="carousel carousel-dark slide text-center" data-mdb-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#usersTestimonials" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#usersTestimonials" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#usersTestimonials" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
          </div>
          <!-- Inner -->
          <div class="carousel-inner">
            <!-- Single item -->
            <div class="carousel-item active" data-bs-interval="1000">
              <div class="container">
                <div class="row">
                  <div class="col-lg-4">
                    <img class="rounded-circle shadow-1-strong mb-4"
                      src="${testimonioa}" alt="avatar" />
                    <h5 class="mb-3">Ana</h5>
                    <p class="text-muted">
                      <i class="fas fa-quote-left pe-2"></i>
                      \xA1Me encanta Outsy! Desde que cree mi perfil no me pierdo ninguna fiesta, he hecho 
                      un mont\xF3n de amigos. Adem\xE1s he visto amigos que ve\xEDa en a\xF1os
                    </p>
                    <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                    </ul>
                  </div>

                  <div class="col-lg-4 d-none d-lg-block">
                    <img class="rounded-circle shadow-1-strong mb-4"
                    src="${testimoniob}"  alt="avatar" />
                    <h5 class="mb-3">Daniel</h5>

                    <p class="text-muted">
                      <i class="fas fa-quote-left pe-2"></i>
                      Antes nunca ve\xEDa a mis amigos, era un l\xEDo ponernos todos de acuerdo,
                      pero con Outsy nos juntamos una vez a la semana. Siempre hay un plan difente
                    </p>
                    <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li>
                        <i class="fas fa-star-half-alt fa-sm"></i>
                      </li>
                    </ul>
                  </div>

                  <div class="col-lg-4 d-none d-lg-block">
                    <img class="rounded-circle shadow-1-strong mb-4"
                    src="${testimonioc}"  alt="avatar" />
                    <h5 class="mb-3">Maria</h5>
                    <p class="text-muted">
                      <i class="fas fa-quote-left pe-2"></i>
                      El mes pasado conoc\xED una cafeter\xEDa, fui a una exposici\xF3n de arte y
                      festejamos el cumplea\xF1os de mi mejor amigo. Nunca cre\xED que podr\xEDa 
                      hacer tantas cosas con mis amigos                       
                    </p>
                    <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="far fa-star fa-sm"></i></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Carousel wrapper -->
      </article>
    </section>
  `;
const marifer = "/assets/marifer.508c1782.png";
const xochitl = "/assets/xochitl.b2b52fdb.png";
const gaby = "/assets/gaby.3b724ce6.png";
const about = `
<!-- Navbar -->
<section id="base">
  <div class="container">
    <header id="home">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#home">
                <img src="${outsylogo}" alt="Logo Outsy" height="75">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="caracter\xEDsticas" href="#features">Caracter\xEDsticas</a>
                    </li>
                    <li class="nav-item">
                        <a id="about" class="nav-link" href="#">Nosotros</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#testimonials">Testimonios</a>
                    </li>
                    <li class="nav-item">
                        <button id="signIn" type="button" class="btn-outsy">Inicia Sesi\xF3n</button>
                    </li>
                    <li class="nav-item">
                        <button id="signUp" type="button" class="btn-outsy">Registrate</button>
                    </li>
                    <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> -->
                    <!-- <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li> -->
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button  class="btn-search" type="submit">Search</button>
                </form>
            </div>
        </div>
      </nav>
    </header>
  </div>
  </section>

  <!-- About Us -->
<section class="aboutus">
  <div class="container py-5">
    <div class="row d-flex justify-content-center">
      <div id="about-text" class="col-md-10 col-xl-8 text-center">
        <h1 class="fw-bold mb-4">Acerca de Nosotras</h1>
        <p class="mb-4 pb-2 mb-md-5 pb-md-0">
          \xA1En Outsy la fiesta nunca para! Nos encanta salir, hacer amigos, conocer
          muchos lugares diferentes y tener nuevas aventuras, \xBFYa nos conoces? 
          Nosotras somos el equipo Outsy
        </p>
      </div>
    </div>

    <div id="ourPictures" class="row text-center">
      <div class="col-md-4 mb-4 mb-md-0">
        <div class="card">
          <div class="card-body py-4 mt-2">
            <div class="d-flex justify-content-center mb-4">
              <img src= "${marifer}"
                class="photos-about shadow-1-strong" width="100" height="100" />
            </div>
            <h5 class="font-weight-bold">Marifer</h5>
            <h6 class="font-weight-bold my-3">Creadora de Outsy</h6>
            <p class="mb-2">
            Caminadora modo Forest Gump <br>
            Mel\xF3mana y Cin\xE9fila <br>
            Viajera Permanente <br>
            Consejera en mis tiempos libres
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4 mb-md-0">
        <div class="card">
          <div class="card-body py-4 mt-2">
            <div class="d-flex justify-content-center mb-4">
              <img src="${xochitl}"
                class="photos-about shadow-1-strong" width="100" height="100" />
            </div>
            <h5 class="font-weight-bold">Xochitl</h5>
            <h6 class="font-weight-bold my-3">Creadora de Outsy</h6>
            <p class="mb-2">
            Amante del arte y la m\xFAsica <br>
            Con el ritmo en la sangre <br>
            Con ganas de comerme el mundo (literalmente)
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-0">
        <div class="card">
          <div class="card-body py-4 mt-2">
            <div class="d-flex justify-content-center mb-4">
              <img src="${gaby}"
                class="photos-about shadow-1-strong" width="100" height="100" />
            </div>
            <h5 class="font-weight-bold">Gaby</h5>
            <h6 class="font-weight-bold my-3">Creadora de Outsy</h6>
            <p class="mb-2">
            Catadora de margaritas <br>
             Entusiasta del cine de horror <br> 
             Fan de los conciertos y las gomitas <br>
            Mi hobbie es bailar hasta cerrar el club
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      `;
const signIn = `
<<!-- Navbar -->
<section id="base">
  <div class="container">
    <header id="home">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#home">
                <img src="${outsylogo}" alt="Logo Outsy" height="75">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="caracter\xEDsticas" href="#features">Caracter\xEDsticas</a>
                    </li>
                    <li class="nav-item">
                        <a id="about" class="nav-link" href="#">Nosotros</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#testimonials">Testimonios</a>
                    </li>
                    <li class="nav-item">
                        <button id="signIn" type="button" class="btn-outsy">Inicia Sesi\xF3n</button>
                    </li>
                    <li class="nav-item">
                        <button id="signUp" type="button" class="btn-outsy">Registrate</button>
                    </li>
                    <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> -->
                    <!-- <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li> -->
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button  class="btn-search" type="submit">Search</button>
                </form>
            </div>
        </div>
      </nav>
    </header>
  </div>

  <!-- Form -->

<section id="signInView" class="background-radial-gradient overflow-hidden">

    <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
      <div class="row gx-lg-5 align-items-center mb-5" form-content>
        <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
          <h1 class="my-5 display-5 fw-bold ls-tight" style="color: darkturquoise">
            Bienvenido a Outsy <br />
            <span style="color: beige">\xBFAlguien dijo salir?</span>
          </h1>
          <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%);text-align: justify;">
          &nbsp;&nbsp; &nbsp;\xA1Estamos tan emocionados de tenerte aqu\xED! Nuestro objetivo es
            siempre ofrecerte un espacio seguro y divertido donde puedas
            conectarte con tus amigos y conocidos. S\xF3lo necesitas registrarte
            con un correo electr\xF3nico v\xE1lido para empezar a explorar y 
            disfrutar de la experiencia Outsy.
           
          </p>
        </div>
  
        <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div class="card bg-glass">
            <div class="card-body px-4 py-5 px-md-5">
              <form id="formSignIn" class: "requires-validation" novalidate> 
                
              <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="email" id="email" class="form-control" required/>
                  <label class="form-label" for="email">Correo Electr\xF3nico</label>
                  <div class="valid-feedback">El email es correcto</div>
                  <div class="invalid-feedback">El email no es v\xE1lido</div>
                </div>
  
                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input type="password" id="password" class="form-control" required/>
                  <label class="form-label" for="password">Contrase\xF1a</label> <br>
                  <input class="form-check-input" type="checkbox" id="showPassword" name="showPassword">
                  <label for="showPassword">Mostrar contrase\xF1a</label>
                  <div class="valid-feedback">La contrase\xF1a es correcta</div>
                  <div class="invalid-feedback">La contrase\xF1a no es v\xE1lida/div>
                </div>
  
                <!-- Checkbox -->
                <div class="form-check d-flex justify-content-center mb-4">
                  <input class="form-check-input me-2" type="checkbox" value="" id="remember"/>
                  <label class="form-check-label" for="remember">
                    Recu\xE9rdame
                  </label> 
                </div>

                <!-- Simple link -->
                <div class="text-center">
                <button type="button" class="btn btn-link btn-floating mx-1" id="password-reset">\xBFOlvidaste tu constrase\xF1a?</button> 
                </div>

                <!-- Register buttons -->
                <div class="text-center">
                <p>\xBFNo est\xE1s registrado? <a href="#!">Registrate</a></p>
  
                <!-- Submit button -->
                <button id="sign-in" class="btn-outsy">
                  Ingresar
                </button>

                <!-- Register buttons -->
                <div class="text-center">
                  <p>o ingresa con:</p>
  
                  <button id="googleAuth" type="button" class="btn-search mb-4">
                    <i class="fab fa-google"></i>
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
const signUp = `
<!-- Navbar -->
<section id="signUpView">
  <div class="container">
    <header id="home">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#home">
                <img src= "${outsylogo}" alt="Logo Outsy" height="75">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="caracter\xEDsticas" href="#features">Caracter\xEDsticas</a>
                    </li>
                    <li class="nav-item">
                        <a id="about" class="nav-link" href="#">Nosotros</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#testimonials">Testimonios</a>
                    </li>
                    <li class="nav-item">
                        <button id="signIn" type="button" class="btn-outsy">Inicia Sesi\xF3n</button>
                    </li>
                    <li class="nav-item">
                        <button id="signUp" type="button" class="btn-outsy">Registrate</button>
                    </li>
                    <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> -->
                    <!-- <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li> -->
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button  class="btn-search" type="submit">Search</button>
                </form>
            </div>
        </div>
      </nav>
    </header>
  </div>

  <!-- Form -->
<section id="signUpView" class="background-radial-gradient overflow-hidden">
<div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
  <div class="row gx-lg-5 align-items-center mb-5">
    <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
      <h1 class="my-5 display-5 fw-bold ls-tight" style="color: darkturquoise">
      Bienvenido a Outsy <br />
        <span style="color: beige">\xBFAlguien dijo salir?</span>
      </h1>
      <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
      &nbsp;&nbsp; &nbsp;\xA1Estamos tan emocionados de tenerte aqu\xED! Nuestro objetivo es
      siempre ofrecerte un espacio seguro y divertido donde puedas
      conectarte con tus amigos y conocidos. S\xF3lo necesitas registrarte
      con un correo electr\xF3nico v\xE1lido para empezar a explorar y 
      disfrutar de la experiencia Outsy.
      </p>
    </div>
    <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
      <div class="card bg-glass">
        <div class="card-body px-4 py-5 px-md-5">
          <form id="formSignUp"> 
          <!-- Username input -->
          <div class="form-outline mb-4">
            <input type="text" id="userName" class="form-control" required/>
            <label class="form-label" for="userName">Nombre de Usuario</label>
          </div>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input type="email" id="email" class="form-control" required/>
              <label class="form-label" for="email">Correo Electr\xF3nico</label>
            </div>
            <!-- Password input -->
            <div class="form-outline mb-4">
              <input type="password" id="password" class="form-control" required/>
              <label class="form-label" for="password">Contrase\xF1a</label> <br>
              <input class="form-check-input" type="checkbox" id="showPassword" name="showPassword">
              <label for="showPassword">Mostrar contrase\xF1a</label>
              <ul>
                  <li>8- 15 caracteres</li>
                  <li>Al menos una letra may\xFAscula</li>
                  <li>Al menos una letra min\xFAscula</li>
                  <li>Al menos un d\xEDgito</li>
                  <li>Sin espacios en blanco</li>
                  <li>Al menos 1 caracter especial</li>
              </ul>
            </div>
            <!-- Repeat password input -->
            <div class="form-outline mb-4">
              <input type="password" id="repeatPassword" class="form-control" required/>
              <label class="form-label" for="repeatPassword">Repetir Contrase\xF1a</label>
            </div>
            <!-- Checkbox -->
            <div class="form-check d-flex justify-content-center mb-4">
              <input class="form-check-input me-2" type="checkbox" value="" id="appTerms" required/>
              <label class="form-check-label text-black" for="appTerms">
                      Acepto los <a href="#!" class="text-blue"><u>T\xE9rminos y Condiciones</u></a>
                    </label>
                    </div>
            <!-- Submit button -->
            <div class="form-check d-flex justify-content-center mb-4">
            <button id="sign-up" class="btn-outsy">
              Registrarme
            </button>
            </div>
            
            
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</section>`;
const feed = `  
 
<!-- Navbar -->
<nav class="navbar navbar-expand-md navbar-dark">
<div class="container-fluid " id="navbar-feed">
  <a class="navbar-brand" href="">
    <img src="${outsylogo}" alt="Logo" height="75" class="d-inline-block align-text-top">
  </a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse " id="navbarSupportedContent">
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="">Dashboard</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="">Notificaciones</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="">Perfil</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="form" role="button" data-bs-toggle="dropdown"
          aria-expanded="false">
          Men\xFA
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" id="post">Crear Publicaci\xF3n</a></li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li><a class="dropdown-item" href="">Ajustes</a></li>
          <li><a class="dropdown-item" href="">Cerrar Sesi\xF3n</a></li>
        </ul>
      </li>
    </ul>
    <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Busqueda">
      <button class="btn btn-outline-light goldButton" type="submit">Buscar</button>
    </form>
  </div>
</div>
</nav>

<!-- Posts -->
<section id="posts">
    <h2 class="border-bottom pb-2 mb-0">Publicaciones Recientes</h2>
    <div class="container mt-5 mb-5">
        <div class="row d-flex align-items-center justify-content-center">
            <div class="col-md-6" id="postContainer">

            </div>
        </div>
    </div>
</section>


  `;
const post = ` 
<!-- Navbar -->
<nav class="navbar navbar-expand-md navbar-dark">
<div class="container-fluid " id="navbar-feed">
  <a class="navbar-brand" href="">
    <img src="${outsylogo}" alt="Logo" height="75" class="d-inline-block align-text-top">
  </a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse " id="navbarSupportedContent">
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="">Dashboard</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="">Notificaciones</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="">Perfil</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="form" role="button" data-bs-toggle="dropdown"
          aria-expanded="false">
          Men\xFA
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" id="post">Crear Publicaci\xF3n</a></li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li><a class="dropdown-item" href="">Ajustes</a></li>
          <li><a class="dropdown-item" href="">Cerrar Sesi\xF3n</a></li>
        </ul>
      </li>
    </ul>
    <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Busqueda">
      <button class="btn btn-outline-light goldButton" type="submit">Buscar</button>
    </form>
  </div>
</div>
</nav>

<!-- Form Create Post -->
<section id="addPostForm">
<div class="container px-4 py-5 px-md-5 justify-content-center text-lg-start my-5">
    <div class="row gx-lg-5 align-items-center mb-5">
        <div id="box" class="col-lg-9 mb-5 mb-lg-0 position-relative">
            <div class="card-post bg-glass-post">
                <div class="card-body px-4 py-5 px-md-5">
                  <h2 class="text-center" style="color: #82C173">Cu\xE9ntale a tus amigos qu\xE9 quieres hacer</h2><br>
                    <form method="POST" enctype="multipart/form-data">
                    <!-- Post Title input -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postTitle">T\xEDtulo</label>
                        <input type="text" id="postTitle" class="form-control" name="postTitle" required />
                    </div>
                    <!-- Date input -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="meeting-time">Fecha</label>
                        <input type="datetime-local" id="postTime" class="form-control" name="meeting-time"
                            value="2023-04-16T19:30" required />
                    </div>
                    <!-- Location input -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postLocation">Lugar</label>
                        <input type="text" id="postLocation" class="form-control" name="postTitle" required />
                    </div>
                    <!-- Description input -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postText">Descripci\xF3n</label>
                        <textarea id="postContent" name="postText" class="form-control" required></textarea>
                    </div>
                    <!-- Image -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postImage">Imagen</label>
                        <input class="form-control" type="file" id="postImage" name="postImage" />
                    </div>
                    <!-- Image -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postPrivacy">Privacidad</label>
                        <select class="form-control" id="postPrivacy" name="postPrivacy">
                            <option value="public">Publico</option>
                            <option value="friends">Amigos</option>
                            <option value="private">Privado</option>
                        </select>
                    </div>
                        <!-- Submit button -->
                        <div class="form-check d-flex justify-content-center mb-4">
                            <button id="addPostButton" class="btn-outsy" type="submit">Guarda
                                post</button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
`;
const postDetail = `
<div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="container py-5">
            <div class="section-title text-center position-relative pb-3 mb-4 mx-auto" style="max-width: 600px;">
                <h5 class="fw-bold text-primary text-uppercase">Post-It</h5>
                <h1 class="mb-0">Por si quieres ver un mensaje en detalle.</h1>
            </div>
            <div class="sticky-container wall mx-auto">
                <div class="sticky-outer">
                    <div class="sticky">
                        <svg width="0" height="0">
                        <defs>
                            <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
                            <path
                                d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                                stroke-linejoin="round"
                                stroke-linecap="square"/>
                            </clipPath>
                        </defs>
                        </svg>
                       
                            <time id= "published" class="date" style="font-size: 11px;">
                                
                            </time>
                       
                        <div class="sticky-content" style="font-size: 18px;"> 
                            
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="text-center position-relative pb-3 mb-4 mx-auto"   style= "padding-bottom: 44px;">
                
                    <a class="btn send animated slideInLeft"  href="{% url 'post_edit' pk=post.pk %}">
                    
                    </a>
                
            </div>
        </div>
    </div>
    `;
const profile = `
<body class="bg-light">
    
<nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Offcanvas navbar</a>
    <button class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Notifications</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Switch account</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Settings</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

<div class="nav-scroller bg-body shadow-sm">
  <nav class="nav" aria-label="Secondary navigation">
    <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
    <a class="nav-link" href="#">
      Friends
      <span class="badge text-bg-light rounded-pill align-text-bottom">27</span>
    </a>
    <a class="nav-link" href="#">Explore</a>
    <a class="nav-link" href="#">Suggestions</a>
    <a class="nav-link" href="#">Link</a>
    <a class="nav-link" href="#">Link</a>
    <a class="nav-link" href="#">Link</a>
    <a class="nav-link" href="#">Link</a>
    <a class="nav-link" href="#">Link</a>
  </nav>
</div>


    `;
const routes = {
  home: {
    path: "/",
    template: home,
    title: "Outsy - Home"
  },
  about: {
    path: "/about",
    template: about,
    title: "Outsy - Con\xF3cenos"
  },
  signIn: {
    path: "/signin",
    template: signIn,
    title: "Outsy - Ingresa"
  },
  signUp: {
    path: "/signup",
    template: signUp,
    title: "Outsy - Reg\xEDstrate"
  },
  feed: {
    path: "/feed",
    template: feed,
    title: "Outsy - Muro"
  },
  createPost: {
    path: "/post/create",
    template: post,
    title: "Outsy - Crear Post"
  },
  editPost: {
    path: "/post/edit",
    template: post,
    title: "Outsy - Editar Post"
  },
  postDetail: {
    path: "/post/detail",
    template: postDetail,
    title: "Outsy - Post"
  },
  profile: {
    path: "/profile",
    template: profile,
    title: "Outsy - Perfil"
  }
};
class Router {
  constructor() {
    this.routes = routes;
    this.currentRoute = null;
    this.container = document.getElementById("root");
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }
  navigateTo(path) {
    const route = Object.values(this.routes).find((route2) => route2.path === path);
    if (route) {
      this.currentRoute = route;
      this.container.innerHTML = route.template;
      document.title = route.title;
      window.history.pushState({ path }, "", path);
      window.scrollTo(0, 0);
    }
  }
  handlePopState(event) {
    const { path } = event.state || {};
    this.navigateTo(path || "/");
  }
  start() {
    this.navigateTo(window.location.pathname);
  }
}
const db = getFirestore(app);
const authApp = auth.getAuth(app);
const storage = getStorage(app, "gs://outsy-mxg.appspot.com");
const router$2 = new Router();
function getCurrentUserName() {
  return authApp.currentUser.displayName;
}
function getCurrentUserId() {
  return authApp.currentUser.uid;
}
async function createPost(title, date, location, content, image, privacy) {
  const userId = getCurrentUserId();
  const author = getCurrentUserName();
  const now = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
  const postDate = now.toLocaleDateString("es-ES", options);
  const formatedDate = new Date(date);
  const dateToStr = formatedDate.toLocaleDateString("es-ES", options);
  const storageRef = ref(storage, `images/${image.name}`);
  const snapshot = await uploadBytes(storageRef, image);
  const imageUrl = await getDownloadURL(snapshot.ref);
  const postRef = await addDoc(collection(db, "posts"), {
    userId,
    author,
    title,
    dateToStr,
    postDate,
    location,
    content,
    privacy,
    imageUrl
  });
  return postRef.id;
}
async function editPost(postId, post2) {
  const titleInput = document.getElementById("postTitle");
  titleInput.value = post2.title;
  const eventDateInput = document.getElementById("postTime");
  eventDateInput.value = post2.postDate;
  const locationInput = document.getElementById("postLocation");
  locationInput.value = post2.location;
  const contentInput = document.getElementById("postContent");
  contentInput.value = post2.content;
  const privacyInput = document.getElementById("postPrivacy");
  privacyInput.value = post2.privacy;
  document.getElementById("addPostButton").addEventListener("click", async (event) => {
    event.preventDefault();
    const title = document.getElementById("postTitle").value;
    const postDate = document.getElementById("postTime").value;
    const location = document.getElementById("postLocation").value;
    const content = document.getElementById("postContent").value;
    const privacy = document.getElementById("postPrivacy").value;
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      title,
      postDate,
      location,
      content,
      privacy
    });
    router$2.navigateTo("/feed");
    await getPosts();
  });
}
async function deletePost(postId) {
  await deleteDoc(doc(db, "posts", postId));
  return getPosts();
}
async function addComment(postId, commentText) {
  const userId = getCurrentUserId();
  const author = getCurrentUserName();
  const now = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
  const createdAt = now.toLocaleDateString("es-ES", options);
  const postRef = doc(db, "posts", postId);
  const commentsRef = collection(postRef, "comments");
  const newCommentRef = await addDoc(commentsRef, {
    text: commentText,
    userId,
    author,
    createdAt
  });
  const commentId = newCommentRef.id;
  await updateDoc(postRef, {
    comments: arrayUnion(commentId)
  });
  await getPosts();
  return commentId;
}
async function likePost(postId) {
  const userId = getCurrentUserId();
  const author = getCurrentUserName();
  const postRef = doc(db, "posts", postId);
  const likesRef = collection(postRef, "likes");
  const newLikeRef = await addDoc(likesRef, {
    userId,
    author
  });
  const likeId = newLikeRef.id;
  await updateDoc(postRef, {
    likes: arrayUnion(likeId)
  });
  return likeId;
}
async function getLikeCount(postId) {
  const postRef = doc(db, "posts", postId);
  const likesRef = collection(postRef, "likes");
  const snapshot = await getCountFromServer(likesRef);
  return snapshot.data().count;
}
async function getPosts() {
  const postContainer = document.getElementById("postContainer");
  postContainer.innerHTML = "";
  const q = query(collection(db, "posts"), where("privacy", "==", "public"), orderBy("postDate", "desc"));
  const querySnapshot = await getDocs(q);
  await Promise.all(
    querySnapshot.docs.map(async (doc2) => {
      const post2 = doc2.data();
      const postId = doc2.id;
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card-feed");
      const flexBetweenDiv = document.createElement("div");
      flexBetweenDiv.classList.add("d-flex", "justify-content-between", "p-2", "px-3");
      const flexRowDiv = document.createElement("div");
      flexRowDiv.classList.add("d-flex", "flex-row", "align-items-center");
      const flexColDiv = document.createElement("div");
      flexColDiv.classList.add("d-flex", "flex-column", "ml-2");
      const nameSpan = document.createElement("span");
      nameSpan.classList.add("font-weight-bold");
      nameSpan.textContent = `Propuesto por: ${post2.author}`;
      const smallColleagues = document.createElement("small");
      smallColleagues.setAttribute("id", "title" + postId);
      smallColleagues.textContent = post2.title;
      const flexRowEllipsisDiv = document.createElement("div");
      flexRowEllipsisDiv.classList.add("d-flex", "flex-row", "mt-1", "ellipsis");
      const date = post2.postDate;
      const smallTimeAgo = document.createElement("small");
      smallTimeAgo.classList.add("mr-2");
      smallTimeAgo.setAttribute("id", "location" + postId);
      smallTimeAgo.textContent = `${date ? date : "Indefinida"}`;
      const iEllipsis = document.createElement("i");
      iEllipsis.classList.add("fa", "fa-ellipsis-h");
      const imgFluid = document.createElement("img");
      imgFluid.setAttribute("src", post2.imageUrl);
      imgFluid.setAttribute("id", "postImg" + postId);
      imgFluid.classList.add("img-fluid", "postImage");
      const pDiv = document.createElement("div");
      pDiv.classList.add("p-2");
      const pTextJustify = document.createElement("p");
      pTextJustify.setAttribute("id", "postContent" + postId);
      pTextJustify.classList.add("text-justify");
      pTextJustify.textContent = post2.content;
      const locationSmall = document.createElement("p");
      smallColleagues.setAttribute("id", "location" + postId);
      locationSmall.textContent = `Lugar: ${post2.location ? post2.location : "Indefinida"}`;
      const eventDate = document.createElement("time");
      eventDate.setAttribute("id", "eventDate" + postId);
      eventDate.classList.add("text-justify");
      eventDate.textContent = `Vamos el: ${post2.dateToStr ? post2.dateToStr : "Indefinida"}`;
      const hr1 = document.createElement("hr");
      const flexBetweenIconsDiv = document.createElement("div");
      flexBetweenIconsDiv.classList.add("d-flex", "justify-content-between", "align-items-center");
      const flexRowIconsDiv = document.createElement("div");
      flexRowIconsDiv.classList.add("d-flex", "flex-row", "icons", "d-flex", "align-items-center");
      const likeButton = document.createElement("button");
      likeButton.setAttribute("id", "like" + postId);
      likeButton.classList.add("btn-icon");
      const iHeart = document.createElement("i");
      iHeart.classList.add("fa", "fa-grin-stars", "fa-sm");
      likeButton.addEventListener("click", () => {
        likePost(postId).then(() => {
          getPosts();
        });
      });
      const flexRowMutedDiv = document.createElement("div");
      flexRowMutedDiv.classList.add("d-flex", "flex-row", "muted-color");
      const editButton = document.createElement("button");
      editButton.setAttribute("id", "edit" + postId);
      editButton.classList.add("btn-icon");
      const iEdit = document.createElement("i");
      iEdit.classList.add("fa", "fa-pen", "fa-sm");
      editButton.addEventListener("click", () => {
        console.log("postid:", postId);
        console.log("post: ", post2);
        router$2.navigateTo("/post/edit");
        editPost(postId, post2);
      });
      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("id", "delete" + postId);
      deleteButton.classList.add("btn-icon");
      const iDelete = document.createElement("i");
      iDelete.classList.add("fa", "fa-trash", "fa-sm");
      deleteButton.addEventListener("click", () => {
        deletePost(postId);
      });
      const spanLikes = document.createElement("span");
      spanLikes.setAttribute("id", "likes");
      const countLikes = await getLikeCount(postId);
      spanLikes.textContent = `${countLikes ? countLikes : 0}`;
      const hr2 = document.createElement("hr");
      const commentsArt = document.createElement("article");
      commentsArt.classList.add("comments");
      commentsArt.setAttribute("id", "comment" + postId);
      const commentsDiv = document.createElement("div");
      const commentForm = document.createElement("form");
      commentForm.className = "comment-input";
      const inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.placeholder = "Agrega un Comentario...";
      inputElement.classList.add("form-control", "comInput");
      const fontsDiv = document.createElement("div");
      fontsDiv.className = "fonts";
      const commentButton = document.createElement("button");
      commentButton.classList.add("btn-icon");
      const imgComment1 = document.createElement("i");
      imgComment1.className = "fa fa-comment fa-sm";
      commentButton.addEventListener("click", () => {
        addComment(postId, inputElement.value);
        inputElement.value = "";
      });
      likeButton.appendChild(iHeart);
      flexRowIconsDiv.appendChild(likeButton);
      flexRowIconsDiv.appendChild(spanLikes);
      editButton.appendChild(iEdit);
      flexRowMutedDiv.appendChild(editButton);
      deleteButton.appendChild(iDelete);
      flexRowMutedDiv.appendChild(deleteButton);
      flexBetweenIconsDiv.appendChild(flexRowIconsDiv);
      flexBetweenIconsDiv.appendChild(flexRowMutedDiv);
      commentButton.appendChild(imgComment1);
      fontsDiv.appendChild(commentButton);
      commentForm.appendChild(inputElement);
      commentForm.appendChild(fontsDiv);
      commentsDiv.appendChild(commentForm);
      pDiv.appendChild(pTextJustify);
      pDiv.appendChild(locationSmall);
      pDiv.appendChild(eventDate);
      pDiv.appendChild(hr1);
      pDiv.appendChild(flexBetweenIconsDiv);
      pDiv.appendChild(hr2);
      pDiv.appendChild(commentsArt);
      pDiv.appendChild(commentsDiv);
      flexRowEllipsisDiv.appendChild(smallTimeAgo);
      flexRowEllipsisDiv.appendChild(iEllipsis);
      flexColDiv.appendChild(nameSpan);
      flexColDiv.appendChild(smallColleagues);
      flexRowDiv.appendChild(flexColDiv);
      flexBetweenDiv.appendChild(flexRowDiv);
      flexBetweenDiv.appendChild(flexRowEllipsisDiv);
      cardDiv.appendChild(flexBetweenDiv);
      cardDiv.appendChild(imgFluid);
      cardDiv.appendChild(pDiv);
      postContainer.appendChild(cardDiv);
      await getComments(postId);
    })
  );
}
async function getComments(postId) {
  console.log("postId: ", postId);
  const comments = document.getElementById("comment" + postId);
  comments.innerHTML = "";
  const postRef = doc(db, "posts", postId);
  const commentsRef = collection(postRef, "comments");
  const querySnapshot = await getDocs(commentsRef);
  await Promise.all(
    querySnapshot.docs.map(async (doc2) => {
      const comment = doc2.data();
      const flexRowComment1Div = document.createElement("div");
      flexRowComment1Div.classList.add("d-flex", "flex-row", "mb-2");
      const commentDiv1 = document.createElement("div");
      commentDiv1.className = "d-flex flex-row mb-2";
      const nameComment = document.createElement("span");
      nameComment.className = "name";
      nameComment.textContent = comment.author;
      const commentTextSmall = document.createElement("small");
      commentTextSmall.className = "comment-text";
      commentTextSmall.textContent = comment.text;
      const statusDiv = document.createElement("div");
      statusDiv.className = "d-flex flex-row align-items-center status";
      const timeSmall = document.createElement("small");
      const dateComment = comment.createdAt;
      timeSmall.textContent = `${dateComment ? dateComment : "Indefinida"}`;
      commentDiv1.appendChild(nameComment);
      commentDiv1.appendChild(commentTextSmall);
      statusDiv.appendChild(timeSmall);
      commentDiv1.appendChild(statusDiv);
      flexRowComment1Div.appendChild(commentDiv1);
      comments.appendChild(flexRowComment1Div);
    })
  );
}
const router$1 = new Router();
function listenPostForm() {
  router$1.navigateTo("/feed");
  getPosts();
  document.getElementById("post").addEventListener("click", () => {
    router$1.navigateTo("/post/create");
    document.getElementById("addPostButton").addEventListener("click", async (event) => {
      event.preventDefault();
      const title = document.getElementById("postTitle").value;
      const date = document.getElementById("postTime").value;
      const location = document.getElementById("postLocation").value;
      const content = document.getElementById("postContent").value;
      const privacy = document.getElementById("postPrivacy").value;
      const image = document.getElementById("postImage").files[0];
      createPost(title, date, location, content, image, privacy);
      router$1.navigateTo("/feed");
      await getPosts();
    });
  });
}
const router = new Router();
router.start();
function scrollFunction() {
  const navbar = document.getElementById("navbar");
  const logo = document.getElementById("logo");
  if (navbar && logo) {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      navbar.style.padding = "30px 10px";
      logo.style.fontSize = "25px";
    } else {
      navbar.style.padding = "80px 10px";
      logo.style.fontSize = "35px";
    }
  }
}
document.addEventListener("DOMContentLoaded", function() {
  const homeView = document.getElementById("main");
  const aboutView = document.getElementById("about");
  if (homeView || aboutView) {
    scrollFunction();
  }
});
(function() {
  router.navigateTo("/home");
  const signInHandler = () => {
    router.navigateTo("/signin");
    listenForm("formSignIn", "sign-in");
  };
  const signUpHandler = () => {
    router.navigateTo("/signup");
    listenForm("formSignUp", "sign-up");
  };
  const aboutHandler = () => {
    router.navigateTo("/about");
  };
  document.getElementById("signIn").addEventListener("click", signInHandler);
  document.getElementById("signUp").addEventListener("click", signUpHandler);
  document.getElementById("about").addEventListener("click", aboutHandler);
})();
function validateEmail(email2) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email2);
}
function validatePassword(password2) {
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  return regexPassword.test(password2);
}
function validateInput(input, type) {
  const Inputvalue = input.value;
  let valid = true;
  if (type === "email") {
    if (validateEmail(Inputvalue)) {
      return;
    } else {
      input.setCustomValidity(
        "Por favor, ingresa un correo electr\xF3nico v\xE1lido"
      );
      valid = false;
    }
  } else if (type === "pass") {
    if (validatePassword(Inputvalue)) {
      return;
    } else {
      input.setCustomValidity("Por favor, ingresa una contrase\xF1a v\xE1lida");
      valid = false;
    }
  }
  return valid;
}
function showPassword() {
  const showPasswordCheckbox = document.getElementById("showPassword");
  const password2 = document.getElementById("password");
  showPasswordCheckbox.addEventListener("change", () => {
    if (showPasswordCheckbox.checked) {
      password2.type = "text";
    } else {
      password2.type = "password";
    }
  });
  return showPasswordCheckbox.checked;
}
function enableButtons(idElement) {
  const elementButton = document.getElementById(idElement);
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  if (elementButton) {
    validateInput(emailInput, "email");
    validateInput(passwordInput, "pass");
    if (idElement === "sign-up") {
      const usernameInput = document.getElementById("userName");
      return [emailInput.value, passwordInput.value, usernameInput.value];
    }
  }
  return [emailInput.value, passwordInput.value, ""];
}
async function listenForm(formID, buttonID) {
  showPassword();
  const data = new Promise((resolve, reject) => {
    document.getElementById(formID).addEventListener("submit", () => {
      const userData = enableButtons(buttonID);
      resolve(userData);
    }, { once: true });
  });
  if (formID === "formSignIn") {
    document.getElementById("googleAuth").addEventListener("click", (e) => {
      e.preventDefault();
      signInWithGoogle().then(
        (useCredential) => {
          router.navigateTo("/feed");
          listenPostForm();
        },
        (error) => {
          openModal(error.message);
        }
      );
    });
  }
  data.then((d) => {
    sendValidData(formID, d[0], d[1], d[2]);
  });
  return email, password;
}
function sendValidData(formID, email2, password2, userName) {
  if (formID === "formSignUp") {
    const emailIgm = document.createElement("img");
    emailIgm.src = "./images/emailVerification.png";
    emailIgm.className = "emailImg";
    const main = document.getElementById("signUpView");
    main.replaceWith(emailIgm);
    handleSignUp(email2, password2, userName);
  } else if (formID === "formSignIn") {
    toggleSignIn(email2, password2);
    router.navigateTo("/feed");
    listenPostForm();
  }
}
