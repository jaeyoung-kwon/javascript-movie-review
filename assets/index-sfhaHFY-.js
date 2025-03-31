var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _movie, _element, _view, _onMovieDetailButtonClick, _element2, _wrapElement, _model, _view2, _onErrorModalOpen, _threshold, _headerElement, _onScroll, _searchBarElement, _headerLogoElement, _view3, _scrollManager, _modalElement, _MessageModalView_instances, render_fn, bindEvents_fn, _view4, _onScroll2, _container, _model2, _view5, _scrollManager2, _onFetchMovieList, _onDetailModalOpen, _MovieListController_instances, fetchAndStoreMovies_fn, handleScroll_fn, _container2, _view6, _scrollManager3, _searchValue, _page, _hasMore, _isLoading, _onDetailModalOpen2, _SearchMovieListController_instances, fetchMovies_fn, handleScroll_fn2, _MainController_instances, onSearchKeywordSubmit_fn, onHomeLogoClick_fn, onErrorModalOpen_fn;
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
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
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
const ERROR_MESSAGE = {
  3: "인증 실패: 서비스 접근 권한이 없습니다.",
  4: "잘못된 형식: 해당 형식의 서비스는 존재하지 않습니다.",
  5: "잘못된 매개변수: 요청 매개변수가 올바르지 않습니다.",
  7: "유효하지 않은 API 키: 유효한 키가 부여되어야 합니다.",
  9: "서비스 오프라인: 이 서비스는 일시적으로 오프라인 상태입니다. 나중에 다시 시도하세요.",
  10: "정지된 API 키: 귀하의 계정 접근이 정지되었습니다. TMDB에 문의하세요.",
  11: "내부 오류: 문제가 발생했습니다. TMDB에 문의하세요.",
  14: "인증 실패.",
  15: "실패했습니다.",
  18: "검증 실패.",
  19: "유효하지 않은 accept 헤더입니다.",
  22: "잘못된 페이지: 페이지는 1부터 500 사이의 정수여야 합니다.",
  24: "백엔드 서버 요청 시간이 초과되었습니다. 다시 시도하세요.",
  25: "요청 횟수 (#)가 허용 한도(40)를 초과했습니다.",
  31: "계정이 비활성화되었습니다. TMDB에 문의하세요.",
  33: "유효하지 않은 요청 토큰: 토큰이 만료되었거나 올바르지 않습니다.",
  34: "요청하신 리소스를 찾을 수 없습니다.",
  35: "유효하지 않은 토큰입니다.",
  42: "해당 리소스는 이 요청 메서드를 지원하지 않습니다.",
  43: "백엔드 서버에 연결할 수 없습니다.",
  46: "API가 유지보수 중입니다. 나중에 다시 시도하세요.",
  47: "입력이 올바르지 않습니다."
};
function $(selector, element = document) {
  return element.querySelector(selector);
}
function $all(selector, element = document) {
  return element.querySelectorAll(selector);
}
const createDOMElement = ({
  tag,
  children,
  ...props
}) => {
  if (!tag) throw new Error("Tag is required");
  const element = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === "class") {
      if (Array.isArray(value)) {
        value.forEach((className) => {
          element.classList.add(className);
        });
      } else if (typeof value === "string") {
        value.split(" ").forEach((className) => {
          if (className !== "") element.classList.add(className);
        });
      }
    }
    if (key in element) {
      element[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  });
  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        if (child) element.appendChild(child);
      });
    } else {
      element.appendChild(children);
    }
  }
  return element;
};
const defaultImage = "/javascript-movie-review/assets/default_poster_image-COpmb5GC.png";
const BackgroundThumbnail = ({ title, backdropPath }) => {
  return createDOMElement({
    tag: "div",
    className: "background-thumbnail-wrapper loading",
    children: createDOMElement({
      tag: "img",
      class: "background-thumbnail",
      src: backdropPath ? `https://media.themoviedb.org/t/p/w440_and_h660_face${backdropPath}` : defaultImage,
      alt: title,
      onload: function() {
        var _a;
        (_a = this.parentElement) == null ? void 0 : _a.classList.remove("loading");
      }
    })
  });
};
const TopRatedMoviePreview = ({ title, voteAverage }) => {
  return createDOMElement({
    tag: "div",
    class: "top-rated-container",
    children: createDOMElement({
      tag: "div",
      class: "top-rated-movie",
      children: [
        createDOMElement({
          tag: "div",
          class: "rate",
          children: [
            createDOMElement({
              tag: "img",
              class: "star",
              src: "./images/star_empty.png"
            }),
            createDOMElement({
              tag: "span",
              class: "rate-value",
              textContent: voteAverage.toFixed(2)
            })
          ]
        }),
        createDOMElement({
          tag: "div",
          class: "title",
          textContent: title
        }),
        createDOMElement({
          tag: "button",
          class: "primary detail",
          textContent: "자세히 보기"
        })
      ]
    })
  });
};
const BackgroundThumbnailContainer = (movie) => {
  return createDOMElement({
    tag: "div",
    class: "background-container",
    children: [
      BackgroundThumbnail({ title: movie.title, backdropPath: movie.backdrop_path }),
      createDOMElement({
        tag: "div",
        class: "overlay",
        "aria-hidden": "true"
      }),
      TopRatedMoviePreview({ title: movie.title, voteAverage: movie.vote_average })
    ]
  });
};
class BackgroundThumbnailView {
  constructor() {
    __privateAdd(this, _movie, null);
    __privateAdd(this, _element);
  }
  renderBackgroundThumbnail(movie) {
    __privateSet(this, _movie, movie);
    __privateSet(this, _element, BackgroundThumbnailContainer(movie));
    const header = $("header");
    header == null ? void 0 : header.insertAdjacentElement("afterend", __privateGet(this, _element));
  }
  bindDetailButtonClick(callback) {
    const button = $("button.detail", __privateGet(this, _element));
    if (!button || !__privateGet(this, _movie)) return;
    button.addEventListener("click", () => {
      callback(__privateGet(this, _movie).id);
    });
  }
  hide() {
    __privateGet(this, _element).classList.add("search");
  }
  show() {
    __privateGet(this, _element).classList.remove("search");
  }
}
_movie = new WeakMap();
_element = new WeakMap();
class BackgroundThumbnailController {
  constructor({ onMovieDetailButtonClick }) {
    __privateAdd(this, _view);
    __publicField(this, "backgroundElement");
    __publicField(this, "movie", null);
    __privateAdd(this, _onMovieDetailButtonClick);
    __privateSet(this, _view, new BackgroundThumbnailView());
    __privateSet(this, _onMovieDetailButtonClick, onMovieDetailButtonClick);
  }
  render(movie) {
    __privateGet(this, _view).renderBackgroundThumbnail(movie);
    __privateGet(this, _view).bindDetailButtonClick(__privateGet(this, _onMovieDetailButtonClick));
  }
  bindEvents() {
    const detailButtonElement = $("button.detail", this.backgroundElement);
    if (this.movie) {
      detailButtonElement == null ? void 0 : detailButtonElement.addEventListener("click", () => {
        if (this.movie) __privateGet(this, _onMovieDetailButtonClick).call(this, this.movie.id);
      });
    }
  }
  hideBackground() {
    __privateGet(this, _view).hide();
  }
  showBackground() {
    __privateGet(this, _view).show();
  }
}
_view = new WeakMap();
_onMovieDetailButtonClick = new WeakMap();
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDEyZGFhZWUwN2U0ZjRiNzIwMzUzMjhlMGI5YTk1NiIsIm5iZiI6MTY0NjQ3MjQ1Ni4yNzIsInN1YiI6IjYyMjMyZDA4MjFjNGNhMDA0NDU0MTYxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6ZlLQpDoBGP1iFnnpyo3ukqKVl9IC3vo4E_hb1Aef1Y";
const BASE_URL = "https://api.themoviedb.org/3";
const baseApi = async (path, query) => {
  const defaultParams = { language: "ko-KR" };
  const searchParams = new URLSearchParams(
    Object.entries({ ...defaultParams, ...query }).reduce(
      (acc, [key, value]) => {
        if (value !== void 0) {
          acc[key] = String(value);
        }
        return acc;
      },
      {}
    )
  );
  const url = `${BASE_URL}${path}?${searchParams.toString()}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`
    }
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.status_code);
  }
  return await response.json();
};
const getMovieDetailResult = async (id) => {
  const movieResult = await baseApi(`/movie/${id}`);
  return movieResult;
};
const LocalStorage = () => ({
  getItem(key) {
    const localItem = localStorage.getItem(key);
    return localItem ? JSON.parse(localItem) : null;
  },
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem(key) {
    localStorage.removeItem(key);
  }
});
const MovieDetailModel = () => {
  let movieDetails = [];
  const localStorage2 = LocalStorage();
  const storedMovieResults = localStorage2.getItem("storedMovieResults");
  if (storedMovieResults) {
    movieDetails = storedMovieResults;
  }
  const getMovieDetailById = async (movieId) => {
    const movieItem = movieDetails.find((movie) => movie.id === movieId);
    if (movieItem) {
      return movieItem;
    } else {
      const movieItem2 = await getMovieDetailResult(movieId);
      const addMovieItem = {
        id: movieItem2.id,
        poster_path: movieItem2.poster_path,
        title: movieItem2.title,
        release_date: movieItem2.release_date,
        genres: movieItem2.genres,
        overview: movieItem2.overview,
        vote_average: movieItem2.vote_average,
        starScore: 0
      };
      addDetailMovieResult(addMovieItem);
      return addMovieItem;
    }
  };
  const addDetailMovieResult = (movieItem) => {
    movieDetails.push(movieItem);
    updateLocalStorage();
  };
  const updateStarScore = (movieId, score) => {
    const targetMovie = movieDetails.find((movie) => movie.id === movieId);
    if (targetMovie) {
      targetMovie.starScore = score;
    }
    updateLocalStorage();
  };
  const updateLocalStorage = () => {
    localStorage2.setItem("storedMovieResults", movieDetails);
  };
  return {
    getMovieDetailById,
    updateStarScore
  };
};
const Spinner = () => {
  return createDOMElement({
    tag: "div",
    class: "orbit-spinner",
    children: [
      createDOMElement({
        tag: "div",
        class: "planet"
      }),
      createDOMElement({
        tag: "div",
        class: "orbit",
        children: [
          createDOMElement({
            tag: "div",
            class: "satellite satellite-1"
          }),
          createDOMElement({
            tag: "div",
            class: "satellite satellite-2"
          })
        ]
      })
    ]
  });
};
const DetailLoadingModal = () => {
  return createDOMElement({
    tag: "div",
    class: "modal-background loading active",
    id: "modalBackground",
    children: Spinner()
  });
};
const CloseButton = () => {
  return createDOMElement({
    tag: "button",
    class: "close-modal",
    id: "closeModal",
    children: createDOMElement({
      tag: "img",
      src: "./images/modal_button_close.png"
    })
  });
};
const DetailModalDescriptionTitle = ({ title, releaseDate, genres, voteAverage }) => {
  return createDOMElement({
    tag: "div",
    class: "modal-description-title",
    children: [
      createDOMElement({
        tag: "h2",
        textContent: title
      }),
      createDOMElement({
        tag: "p",
        textContent: `${releaseDate.split("-")[0]} · ${genres.map((genre) => genre.name).join(", ")}`
      }),
      createDOMElement({
        tag: "p",
        class: "modal-vote-average",
        children: [
          createDOMElement({
            tag: "img",
            src: "./images/star_filled.png",
            class: "star"
          }),
          createDOMElement({
            tag: "span",
            textContent: voteAverage
          })
        ]
      })
    ]
  });
};
const SCORE_RATING_TEXT = {
  0: "별점을 매겨주세요",
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요"
};
const DetailModalMyStar = ({ starScore }) => {
  const starButtons = Array.from(
    { length: 5 },
    (_, index) => createDOMElement({
      tag: "img",
      id: `starButton${index}`,
      src: "./images/star_empty.png",
      class: "modal-star-button"
    })
  );
  starButtons.forEach((btn, i) => {
    const img = btn;
    img.src = i < starScore / 2 ? "./images/star_filled.png" : "./images/star_empty.png";
  });
  return createDOMElement({
    tag: "div",
    class: "modal-star-wrapper",
    children: [
      createDOMElement({
        tag: "h3",
        class: "modal-star-title",
        textContent: "내 별점"
      }),
      createDOMElement({
        tag: "div",
        class: "modal-star-box",
        children: [
          createDOMElement({
            tag: "div",
            class: "modal-star-button-wrapper",
            children: starButtons
          }),
          createDOMElement({
            tag: "span",
            class: "modal-star-text",
            textContent: SCORE_RATING_TEXT[starScore],
            children: [
              starScore > 0 ? createDOMElement({
                tag: "span",
                class: "modal-star-score",
                textContent: ` (${starScore}/10)`
              }) : null
            ]
          })
        ]
      })
    ]
  });
};
const DetailModalDescription = ({
  title,
  releaseDate,
  genres,
  voteAverage,
  starScore,
  overview
}) => {
  return createDOMElement({
    tag: "div",
    class: "modal-description",
    children: [
      DetailModalDescriptionTitle({ title, releaseDate, genres, voteAverage }),
      createDOMElement({
        tag: "hr"
      }),
      DetailModalMyStar({ starScore }),
      createDOMElement({
        tag: "hr"
      }),
      createDOMElement({
        tag: "p",
        class: "detail",
        textContent: overview ?? ""
      })
    ]
  });
};
const DetailModalImage = ({ posterPath, onload }) => {
  return createDOMElement({
    tag: "div",
    class: "modal-image",
    children: createDOMElement({
      tag: "img",
      src: posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : defaultImage,
      onload
    })
  });
};
const DetailModal = (movieDetail, onImageLoad) => {
  return createDOMElement({
    tag: "div",
    class: "modal-background active",
    id: "modalBackground",
    children: createDOMElement({
      tag: "div",
      class: "modal",
      children: [
        CloseButton(),
        createDOMElement({
          tag: "div",
          class: "modal-container",
          children: [
            DetailModalImage({ posterPath: movieDetail.poster_path, onload: onImageLoad }),
            DetailModalDescription({
              title: movieDetail.title,
              releaseDate: movieDetail.release_date,
              genres: movieDetail.genres,
              voteAverage: movieDetail.vote_average,
              starScore: movieDetail.starScore,
              overview: movieDetail.overview
            })
          ]
        })
      ]
    })
  });
};
const calculateScore = (index) => index * 2 + 2;
class DetailModalView {
  constructor() {
    __privateAdd(this, _element2);
    __privateAdd(this, _wrapElement);
    __privateSet(this, _element2, null);
    __privateSet(this, _wrapElement, $("#wrap"));
  }
  renderLoading() {
    var _a;
    __privateSet(this, _element2, DetailLoadingModal());
    (_a = __privateGet(this, _wrapElement)) == null ? void 0 : _a.insertAdjacentElement("afterend", __privateGet(this, _element2));
  }
  renderDetailModalWhenReady(movieDetail, onDetailReady) {
    const fullModal = DetailModal(movieDetail, () => {
      var _a;
      (_a = __privateGet(this, _element2)) == null ? void 0 : _a.replaceWith(fullModal);
      __privateSet(this, _element2, fullModal);
      onDetailReady();
    });
  }
  bindCloseEvents(onClose) {
    if (__privateGet(this, _element2)) {
      __privateGet(this, _element2).addEventListener("click", (e) => {
        if (e.target === e.currentTarget) onClose();
      });
      const closeBtn = $("#closeModal", __privateGet(this, _element2));
      closeBtn == null ? void 0 : closeBtn.addEventListener("click", onClose);
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") onClose();
      });
    }
  }
  bindStarEvents(movieId, updateScore) {
    if (__privateGet(this, _element2)) {
      const starButtons = $all(".modal-star-button", __privateGet(this, _element2));
      const ratingText = $(".modal-star-text", __privateGet(this, _element2));
      starButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
          const score = calculateScore(index);
          updateScore(movieId, score);
          starButtons.forEach((btn, i) => {
            const img = btn;
            img.src = i <= index ? "./images/star_filled.png" : "./images/star_empty.png";
          });
          if (ratingText) {
            ratingText.textContent = SCORE_RATING_TEXT[score];
            const span = document.createElement("span");
            span.className = "modal-star-score";
            span.textContent = ` (${score}/10)`;
            ratingText.appendChild(span);
          }
        });
      });
    }
  }
  remove() {
    var _a;
    (_a = __privateGet(this, _element2)) == null ? void 0 : _a.remove();
  }
}
_element2 = new WeakMap();
_wrapElement = new WeakMap();
class DetailModalController {
  constructor({ onErrorModalOpen }) {
    __privateAdd(this, _model);
    __privateAdd(this, _view2);
    __privateAdd(this, _onErrorModalOpen);
    __privateSet(this, _model, MovieDetailModel());
    __privateSet(this, _view2, new DetailModalView());
    __privateSet(this, _onErrorModalOpen, onErrorModalOpen);
  }
  async showModal(movieId) {
    try {
      __privateGet(this, _view2).renderLoading();
      const movieDetail = await __privateGet(this, _model).getMovieDetailById(movieId);
      __privateGet(this, _view2).renderDetailModalWhenReady(movieDetail, () => {
        __privateGet(this, _view2).bindCloseEvents(() => this.closeModal());
        __privateGet(this, _view2).bindStarEvents(movieId, __privateGet(this, _model).updateStarScore);
      });
    } catch (error) {
      __privateGet(this, _onErrorModalOpen).call(this, error);
    }
  }
  closeModal() {
    __privateGet(this, _view2).remove();
  }
}
_model = new WeakMap();
_view2 = new WeakMap();
_onErrorModalOpen = new WeakMap();
class HeaderScrollManager {
  constructor(threshold = 300) {
    __privateAdd(this, _threshold);
    __privateAdd(this, _headerElement);
    __privateAdd(this, _onScroll, () => {
      if (window.scrollY > __privateGet(this, _threshold)) {
        __privateGet(this, _headerElement).classList.add("scrolled");
      } else {
        __privateGet(this, _headerElement).classList.remove("scrolled");
      }
    });
    __privateSet(this, _threshold, threshold);
    __privateSet(this, _headerElement, $("header"));
  }
  bind() {
    window.addEventListener("scroll", __privateGet(this, _onScroll));
  }
  unbind() {
    window.removeEventListener("scroll", __privateGet(this, _onScroll));
  }
}
_threshold = new WeakMap();
_headerElement = new WeakMap();
_onScroll = new WeakMap();
class HeaderView {
  constructor() {
    __privateAdd(this, _searchBarElement);
    __privateAdd(this, _headerLogoElement);
    __privateSet(this, _searchBarElement, $(".search-bar"));
    __privateSet(this, _headerLogoElement, $(".header-wrapper .logo"));
  }
  bindSearchEvent(onSearch) {
    __privateGet(this, _searchBarElement).addEventListener("submit", (event) => {
      event.preventDefault();
      const formElement = event.target;
      const input = $("input", formElement);
      const searchValue = input == null ? void 0 : input.value;
      if (searchValue) {
        onSearch(searchValue);
      }
    });
  }
  bindHomeLogoClick(onClick) {
    __privateGet(this, _headerLogoElement).addEventListener("click", () => {
      onClick();
      const input = $("input", __privateGet(this, _searchBarElement));
      if (input) input.value = "";
    });
  }
}
_searchBarElement = new WeakMap();
_headerLogoElement = new WeakMap();
class HeaderController {
  constructor({
    onSearchKeywordSubmit,
    onHomeLogoClick
  }) {
    __privateAdd(this, _view3);
    __privateAdd(this, _scrollManager);
    __privateSet(this, _view3, new HeaderView());
    __privateSet(this, _scrollManager, new HeaderScrollManager());
    __privateGet(this, _view3).bindSearchEvent(onSearchKeywordSubmit);
    __privateGet(this, _view3).bindHomeLogoClick(onHomeLogoClick);
    __privateGet(this, _scrollManager).bind();
  }
}
_view3 = new WeakMap();
_scrollManager = new WeakMap();
const MessageModal = (message) => {
  return createDOMElement({
    tag: "div",
    class: "modal-background",
    children: createDOMElement({
      tag: "div",
      class: "modal-content-box",
      children: [
        createDOMElement({
          tag: "img",
          src: "./images/empty_planet.svg"
        }),
        createDOMElement({
          tag: "span",
          class: "modal-text",
          textContent: message
        })
      ]
    })
  });
};
const mainElement = $("main");
class MessageModalView {
  constructor() {
    __privateAdd(this, _MessageModalView_instances);
    __privateAdd(this, _modalElement);
    __privateSet(this, _modalElement, MessageModal(""));
    __privateMethod(this, _MessageModalView_instances, render_fn).call(this);
    __privateMethod(this, _MessageModalView_instances, bindEvents_fn).call(this);
  }
  updateText(text) {
    const spanElement = $("span", __privateGet(this, _modalElement));
    if (spanElement) spanElement.innerText = text;
  }
  show() {
    __privateGet(this, _modalElement).classList.add("active");
  }
  close() {
    __privateGet(this, _modalElement).classList.remove("active");
  }
}
_modalElement = new WeakMap();
_MessageModalView_instances = new WeakSet();
render_fn = function() {
  mainElement.insertAdjacentElement("afterend", __privateGet(this, _modalElement));
};
bindEvents_fn = function() {
  __privateGet(this, _modalElement).addEventListener("click", (e) => {
    if (e.target === e.currentTarget) this.close();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  });
};
class MessageModalController {
  constructor() {
    __privateAdd(this, _view4);
    __privateSet(this, _view4, new MessageModalView());
  }
  changeContentMessage(text) {
    __privateGet(this, _view4).updateText(text);
  }
  showModal(text) {
    __privateGet(this, _view4).updateText(text);
    __privateGet(this, _view4).show();
  }
  closeModal() {
    __privateGet(this, _view4).close();
  }
}
_view4 = new WeakMap();
const getPopularMovieResult = async (page) => {
  const movieResult = await baseApi("/movie/popular", { page });
  return movieResult;
};
const MovieListModel = () => {
  const movieList = [];
  let page = 0;
  let maxPage = 0;
  const addMovieList = (newPage, list) => {
    movieList.push(...list);
    page = newPage;
  };
  const initializeTotalPage = (totalPage) => {
    maxPage = totalPage;
  };
  return {
    getMovieList: () => [...movieList],
    getPage: () => page,
    hasMore: () => page !== maxPage,
    addMovieList,
    initializeTotalPage
  };
};
class MovieListScrollManager {
  constructor(onScroll) {
    __privateAdd(this, _onScroll2);
    __privateSet(this, _onScroll2, onScroll);
  }
  bind() {
    window.addEventListener("scroll", __privateGet(this, _onScroll2));
  }
  unbind() {
    window.removeEventListener("scroll", __privateGet(this, _onScroll2));
  }
  static isNearBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
  }
}
_onScroll2 = new WeakMap();
const MovieItem = (movie) => {
  return createDOMElement({
    tag: "li",
    children: [
      createDOMElement({
        tag: "div",
        class: "item",
        id: movie.id,
        children: [
          createDOMElement({
            tag: "div",
            class: "thumbnail-wrapper loading",
            children: createDOMElement({
              tag: "img",
              class: "thumbnail",
              src: movie.poster_path ? `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}` : defaultImage,
              alt: movie.title,
              onload: function() {
                var _a;
                (_a = this.parentElement) == null ? void 0 : _a.classList.remove("loading");
              }
            })
          }),
          createDOMElement({
            tag: "div",
            class: "item-desc",
            children: [
              createDOMElement({
                tag: "p",
                class: "rate",
                children: [
                  createDOMElement({
                    tag: "img",
                    class: "star",
                    src: "./images/star_empty.png"
                  }),
                  createDOMElement({
                    tag: "span",
                    textContent: movie.vote_average
                  })
                ]
              }),
              createDOMElement({
                tag: "strong",
                textContent: movie.title
              })
            ]
          })
        ]
      })
    ]
  });
};
const MovieListSection = ({ title, movieList }) => {
  return createDOMElement({
    tag: "section",
    children: [
      createDOMElement({
        tag: "h2",
        textContent: title
      }),
      createDOMElement({
        tag: "ul",
        class: "thumbnail-list",
        children: movieList.map((movie) => MovieItem(movie))
      })
    ]
  });
};
class MovieListView {
  constructor(container) {
    __privateAdd(this, _container);
    __privateSet(this, _container, container);
  }
  renderInitialList(movieList) {
    const sectionElement = MovieListSection({ title: "지금 인기 있는 영화", movieList });
    __privateGet(this, _container).replaceChildren(sectionElement);
  }
  appendMovies(movieList) {
    const movieListContainer = $("ul", __privateGet(this, _container));
    if (!movieListContainer) return;
    movieListContainer.append(...movieList.map((movie) => MovieItem(movie)));
  }
  bindMovieClickEvent(onClick) {
    const ulElement = $("ul", __privateGet(this, _container));
    ulElement == null ? void 0 : ulElement.addEventListener("click", (event) => {
      const item = event.target.closest(".item");
      if (item) onClick(Number(item.id));
    });
  }
}
_container = new WeakMap();
class MovieListController {
  constructor({
    onFetchMovieList,
    onDetailModalOpen
  }) {
    __privateAdd(this, _MovieListController_instances);
    __privateAdd(this, _model2);
    __privateAdd(this, _view5);
    __privateAdd(this, _scrollManager2);
    __publicField(this, "isLoading", false);
    __privateAdd(this, _onFetchMovieList);
    __privateAdd(this, _onDetailModalOpen);
    __privateSet(this, _model2, MovieListModel());
    __privateSet(this, _view5, new MovieListView(mainElement));
    __privateSet(this, _scrollManager2, new MovieListScrollManager(__privateMethod(this, _MovieListController_instances, handleScroll_fn).bind(this)));
    __privateSet(this, _onFetchMovieList, onFetchMovieList);
    __privateSet(this, _onDetailModalOpen, onDetailModalOpen);
  }
  async render() {
    const movieList = await __privateMethod(this, _MovieListController_instances, fetchAndStoreMovies_fn).call(this);
    __privateGet(this, _view5).renderInitialList(movieList);
    __privateGet(this, _view5).bindMovieClickEvent(__privateGet(this, _onDetailModalOpen));
    __privateGet(this, _scrollManager2).bind();
    __privateGet(this, _onFetchMovieList).call(this, movieList[0]);
  }
  async renderExistingMovieList() {
    const movieList = __privateGet(this, _model2).getMovieList();
    __privateGet(this, _view5).renderInitialList(movieList);
    __privateGet(this, _view5).bindMovieClickEvent(__privateGet(this, _onDetailModalOpen));
    __privateGet(this, _scrollManager2).bind();
  }
  removeScrollEvent() {
    __privateGet(this, _scrollManager2).unbind();
  }
}
_model2 = new WeakMap();
_view5 = new WeakMap();
_scrollManager2 = new WeakMap();
_onFetchMovieList = new WeakMap();
_onDetailModalOpen = new WeakMap();
_MovieListController_instances = new WeakSet();
fetchAndStoreMovies_fn = async function(page = 1) {
  const {
    page: newPage,
    total_pages: totalPage,
    results: movieList
  } = await getPopularMovieResult(page);
  __privateGet(this, _model2).addMovieList(newPage, movieList);
  __privateGet(this, _model2).initializeTotalPage(totalPage);
  return movieList;
};
handleScroll_fn = async function() {
  if (!MovieListScrollManager.isNearBottom() || this.isLoading || !__privateGet(this, _model2).hasMore()) return;
  this.isLoading = true;
  const movieList = await __privateMethod(this, _MovieListController_instances, fetchAndStoreMovies_fn).call(this, __privateGet(this, _model2).getPage() + 1);
  __privateGet(this, _view5).appendMovies(movieList);
  this.isLoading = false;
};
const getSearchMovieResult = async (inputData, page) => {
  const searchResult = await baseApi("/search/movie", {
    query: inputData,
    include_adult: false,
    page
  });
  return searchResult;
};
const MovieEmptySection = (title) => {
  return createDOMElement({
    tag: "section",
    children: [
      createDOMElement({
        tag: "h2",
        textContent: title
      }),
      createDOMElement({
        tag: "div",
        class: "empty-wrapper",
        children: [
          createDOMElement({
            tag: "img",
            src: "./images/empty_planet.svg"
          }),
          createDOMElement({
            tag: "h2",
            textContent: "검색 결과가 없습니다."
          })
        ]
      })
    ]
  });
};
class SearchMovieListView {
  constructor(container) {
    __privateAdd(this, _container2);
    __privateSet(this, _container2, container);
  }
  renderInitialList(movieList, keyword) {
    const sectionElement = movieList.length > 0 ? MovieListSection({ title: `"${keyword}" 검색 결과`, movieList }) : MovieEmptySection(`"${keyword}" 검색 결과`);
    __privateGet(this, _container2).replaceChildren(sectionElement);
  }
  appendMovies(movieList) {
    const movieListContainer = $("ul", __privateGet(this, _container2));
    if (!movieListContainer) return;
    movieListContainer.append(...movieList.map((movie) => MovieItem(movie)));
  }
  bindMovieClickEvent(onClick) {
    const ulElement = $("ul", __privateGet(this, _container2));
    ulElement == null ? void 0 : ulElement.addEventListener("click", (event) => {
      const item = event.target.closest(".item");
      if (item) onClick(Number(item.id));
    });
  }
}
_container2 = new WeakMap();
class SearchMovieListController {
  constructor({ onDetailModalOpen }) {
    __privateAdd(this, _SearchMovieListController_instances);
    __privateAdd(this, _view6);
    __privateAdd(this, _scrollManager3);
    __privateAdd(this, _searchValue, "");
    __privateAdd(this, _page, 0);
    __privateAdd(this, _hasMore, false);
    __privateAdd(this, _isLoading, false);
    __privateAdd(this, _onDetailModalOpen2);
    __privateSet(this, _view6, new SearchMovieListView(mainElement));
    __privateSet(this, _scrollManager3, new MovieListScrollManager(__privateMethod(this, _SearchMovieListController_instances, handleScroll_fn2).bind(this)));
    __privateSet(this, _onDetailModalOpen2, onDetailModalOpen);
  }
  async render(searchValue) {
    __privateSet(this, _searchValue, searchValue);
    __privateSet(this, _page, 0);
    const movieList = await __privateMethod(this, _SearchMovieListController_instances, fetchMovies_fn).call(this);
    __privateGet(this, _view6).renderInitialList(movieList, __privateGet(this, _searchValue));
    __privateGet(this, _view6).bindMovieClickEvent(__privateGet(this, _onDetailModalOpen2));
    __privateGet(this, _scrollManager3).bind();
  }
  removeScrollEvent() {
    __privateGet(this, _scrollManager3).unbind();
  }
}
_view6 = new WeakMap();
_scrollManager3 = new WeakMap();
_searchValue = new WeakMap();
_page = new WeakMap();
_hasMore = new WeakMap();
_isLoading = new WeakMap();
_onDetailModalOpen2 = new WeakMap();
_SearchMovieListController_instances = new WeakSet();
fetchMovies_fn = async function() {
  const {
    page: newPage,
    total_pages: totalPage,
    results: movieList
  } = await getSearchMovieResult(__privateGet(this, _searchValue), __privateGet(this, _page) + 1);
  __privateSet(this, _page, newPage);
  __privateSet(this, _hasMore, newPage !== totalPage);
  return movieList;
};
handleScroll_fn2 = async function() {
  if (!MovieListScrollManager.isNearBottom() || __privateGet(this, _isLoading) || !__privateGet(this, _hasMore)) return;
  __privateSet(this, _isLoading, true);
  const movieList = await __privateMethod(this, _SearchMovieListController_instances, fetchMovies_fn).call(this);
  __privateGet(this, _view6).appendMovies(movieList);
  __privateSet(this, _isLoading, false);
};
const _MainController = class _MainController {
  constructor() {
    __privateAdd(this, _MainController_instances);
    __publicField(this, "backgroundThumbnailController");
    __publicField(this, "movieListController");
    __publicField(this, "searchMovieListController");
    __publicField(this, "messageModalController");
    __publicField(this, "detailModalController");
    this.messageModalController = new MessageModalController();
    this.detailModalController = new DetailModalController({
      onErrorModalOpen: __privateMethod(this, _MainController_instances, onErrorModalOpen_fn).bind(this)
    });
    this.backgroundThumbnailController = new BackgroundThumbnailController({
      onMovieDetailButtonClick: (movieId) => {
        this.detailModalController.showModal(movieId);
      }
    });
    this.movieListController = new MovieListController({
      onFetchMovieList: (movie) => {
        this.backgroundThumbnailController.render(movie);
      },
      onDetailModalOpen: (movieId) => {
        this.detailModalController.showModal(movieId);
      }
    });
    this.searchMovieListController = new SearchMovieListController({
      onDetailModalOpen: (movieId) => {
        this.detailModalController.showModal(movieId);
      }
    });
    new HeaderController({
      onSearchKeywordSubmit: __privateMethod(this, _MainController_instances, onSearchKeywordSubmit_fn).bind(this),
      onHomeLogoClick: __privateMethod(this, _MainController_instances, onHomeLogoClick_fn).bind(this)
    });
    if (_MainController.instance) {
      return _MainController.instance;
    }
    _MainController.instance = this;
  }
  async render() {
    try {
      await this.movieListController.render();
    } catch (error) {
      __privateMethod(this, _MainController_instances, onErrorModalOpen_fn).call(this, error);
    }
  }
};
_MainController_instances = new WeakSet();
onSearchKeywordSubmit_fn = async function(searchValue) {
  try {
    this.backgroundThumbnailController.hideBackground();
    this.movieListController.removeScrollEvent();
    await this.searchMovieListController.render(searchValue);
  } catch (error) {
    __privateMethod(this, _MainController_instances, onErrorModalOpen_fn).call(this, error);
  }
};
onHomeLogoClick_fn = function() {
  this.backgroundThumbnailController.showBackground();
  this.searchMovieListController.removeScrollEvent();
  this.movieListController.renderExistingMovieList();
};
onErrorModalOpen_fn = function(error) {
  this.messageModalController.showModal(ERROR_MESSAGE[Number(error.message)] || "알 수 없는 오류가 발생했습니다.");
};
__publicField(_MainController, "instance");
let MainController = _MainController;
window.scrollTo(0, 0);
const main = new MainController();
main.render();
