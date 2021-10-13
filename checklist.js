/**
 *
 * @param {number} levels number of level
 * @param {any[][]} list list of arrays
 * @param {function} onclick button click function
 */
function checklist(levels, list,...args) {
    /**
 * Get kwargs object of switches
 * @param {string[]} switches array of switches to parse
 * @param {...string} args args to parse into switches
 * @return {{string: boolean}} kwargs object
 */
argSwitches = (switches, ...args) => args.map(i=>switches.filter(j=>j.startsWith(i) || ("-" + j).startsWith(i) || ("--" + j).startsWith(i))).filter(i=>i.length===1).reduce((i,[j])=>({...i,[j]:!0}),Object.fromEntries(switches.map(i=>[i,!1])))



   const z=new DOMParser().parseFromString('<div class="selector-bg">\n\
    <style>\n\
        .selector-bg {\n\
            position: fixed;\n\
            width: 100%;\n\
            height: 100%;\n\
            background-color: #000000;\n\
            opacity: 0.7;\n\
            z-index: 1000;\n\
            top: 0;\n\
        }\n\
\n\
        .selector {\n\
            position: fixed;\n\
            top: 0px;\n\
            bottom: 0px;\n\
            left: 0px;\n\
            right: 0px;\n\
            width: 60%;\n\
            height: 80%;\n\
            max-width: 800px;\n\
            margin: auto;\n\
            overflow-y: auto;\n\
            border: 10px solid #eee;\n\
            box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);\n\
            padding: 15px 20px;\n\
            /* background-color: #ffffff; */\n\
            z-index: 1001;\n\
            /* list-style: none; */\n\
        }\n\
    </style>\n\
</div>\n\
<div class="selector"></div>','text/html')//.querySelector('.selector');



for (const i in args) {
		if (Object.hasOwnProperty.call(args, i)) {
			const arg = args[i];
			if (typeof arg === "function") {var onclick = args.splice(i,1)[0]}
		}
	}

   const {background,Bg, append} = argSwitches(["background","Bg","append"],...args)
   const bg = background || Bg;

/**
 * @type {string}
 */

const style = '<style>#checkboxes  {\n\
    color: rgb(181, 175, 165);\n\
    font: 500 18px / 19.8px "Helvetica Neue", Helvetica, Arial, sans-serif;\n\
    --darkreader-neutral-background: #131516;\n\
    --darkreader-neutral-text: #d8d4cf;\n\
    --darkreader-selection-background: #004daa;\n\
    --darkreader-selection-text: #e8e6e3;\n\
    background-color: rgb(24, 26, 27) !important;\n\
    border-color: #736b5e !important;\n\
    color: #e8e6e3 !important;\n\
}\n\
\n\
#checkboxes ul {\n\
    display: flex;\n\
    flex-direction: column;\n\
}\n\
\n\
li {\n\
    display: flex;\n\
    flex-direction: column;\n\
    align-content: center;\n\
    justify-content: center;\n\
}</style>'

/**
 * @type {HTMLInputElement}
 */
const checkList=new DOMParser().parseFromString('<div id=checkboxes><textarea name="checked" id="checked" cols="30" rows="10"></textarea><input type="button" value="Get Checked">' + style + categorize(list.filter(i=>i.some(i=>i)).filter((i,j,k)=>k.findIndex(j=>j.every(j=>i.includes(j)))===j).map(i=>
        // [i.splice(0,levels).map((i,j)=>'<h' + (j+=2) + '><label><input type="checkbox">' + i + '</label></h' + j + '></ul>'),i.map(i=>'<li><label><input type="checkbox">' + i + '</label></li>')]
        [(i=i.map((i,j,k)=>i && k.indexOf(i) == j ? i : '')).splice(0,levels).map((i,j)=>i && '<h' + (j+=2) + '><label><input type="checkbox">' + (i||"") + '</label></h' + j + '>'),i.map(i=>i && '<li><label><input type="checkbox">' + i + '</label></li>')]
    ).sort(([i],[j])=>+!i.join("")||-!j.join(""))) + '</div>',"text/html").body.firstElementChild;

    for (let node of checkList.parentElement.querySelectorAll('*')) node.dataset.id=$x('(./ancestor-or-self::*[not(.//div[@id="checkboxes"])])',node).reduce((i,j,k)=>i+""+((k+1)%3?".":":")+[...j.parentElement.children].indexOf(j).toString(36),"")
    //.reduce((j,i)=>j.replace(i.outerHTML+(i.matches("label>*,h2 >*,h3 >*,li >*")||""),'\n'+'\t'.repeat(i.dataset.id.match(/[:.]/g).length-1)+i.outerHTML.replace(/(?<=.+)(?=<\/[^<]+$)/g,!i.matches('ul>:not(ul),label') ? '\n'+'\t'.repeat(i.dataset.id.match(/[:.]/g).length-1):'')),checkList.innerHTML)

    checkBoxesDarkReaderStyleObserver = new MutationObserver(m => {
        const selector = '[data-id=".0.2"] ~ style',
        nodes = m.map(i => [i.target, ...i.addedNodes, [...i.addedNodes].map(n=> n.querySelectorAll ? [...n.querySelectorAll(selector)] : [])])
            .flat(3)
            .filter(i => i.matches && i.matches(selector));
        for (let node of nodes) if (!node.innerText) node.innerText = " ";
    });
    checkBoxesDarkReaderStyleObserver.observe(checkList,{subtree:!0,childList:!0})
    checkList.addEventListener("change",checkList.onchange = e=> checked.value = [...document.querySelectorAll(":checked")].map(i=>i.nextSibling.textContent).join(","));

    if (onclick) checkList.querySelector('[type=button]').onclick = e=> onclick.call(this,[checkList.firstElementChild.value,e])

    for (let node of $x('.//*[contains(name(),"h")]',checkList)) {node.onclick = e=> {if (!e.target.matches("input"))return (e.preventDefault(),!1)};   node.ondblclick = ({target})=>{const [header,...list] = target.closest("ul").querySelectorAll("input[type='checkbox']"); header.checked=!header.checked; for (let checkbox of list) checkbox.checked = header.checked;checkList.dispatchEvent(new Event("change")); }}


    function categorize(list,level = levels) {
        if (!level) return list.map(([,i])=>i).join("");
        return categorize(groupBy([[0],[1]],list)
        .map(([i,j])=>[i,'<ul>' + i.pop() + (level === levels ? '<ul>' : '') + (/(?=<\/[^<]+$)/,j.flat().join("")+'</ul>'.repeat(1 + (level === levels)))]),level-1)
        // .map(([i,j])=>[i,i.pop() + (/(?=<\/[^<]+$)/,j.join(""))])
    }
            if (bg) {var [zz,zzz] =z.children; z.querySelector(".selector").replaceChildren(checkList);const escClose = ({key})=>{if (key==="Escape") {zz.remove();zzz.remove();removeEventListener("keydown",escClose);return !1;}};addEventListener("keydown",escClose)}
            if (append) {bg ? document.body.append(...z.children) : document.body.append(checkList)}

    return checkList

/**
 * @template K,V
 */

/**
 *
 * @param {number | string | ()=>K | (number | string | ()=>K)[] | [(number | string | ()=>K)[] | number | string | ()=>K, number | string | ()=>V | (number | string | ()=>V)[]]} a properties to group by
 * @param {1 | 0 | -1} sort sort direction
 * @param {any[]} b list to group
 * @returns {[K,V][]} grouped array
 */
    function groupBy(a, sort = 0, ...b) {

    /**
       * @type {Map<K,V>}
      */
      const imap = Object.assign(new Map(), {
          /**
           * Insert value by key,
           * add to list if key exists, otherwise create new list
           * @template K,V
           * @param  {K} k Key
           * @param  {V[]} v Values
           * @returns {Map<K,V[]>} map with new value added
           */
          set(k, ...v) {
              var kk;
              if (this.isPlainObjOrArray(k))
                  ([k, kk] = [...this, [k, []]].find(([i]) => this.objKeyEquals(k, i)));

              else
                  kk = this.get(k) || [];
              return Map.prototype.set.apply(this, [k, [].concat(kk, [...v])]);
          },
          /**
           * Determine if object is object or array
           * @template K
           * @param {K} object Object to check
           * @returns {boolean} true if object is plain object or array, otherwise false
           */
          isPlainObjOrArray(object) {
              return Array.isArray(object) || Object.getPrototypeOf(object ?? "") === {}.__proto__;
          },

          /**
           * Determine if objects are equal
           * @template K
           * @param  {K} a
           * @param  {K} b
           * @returns {boolean} true if objects are equal, otherwise false
           */
          objKeyEquals(a, b) {
              if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
                  return false;
              const keysA = Object.keys(a), keysB = Object.keys(b);
              return keysA.length === keysB.length &&
                  keysA.every((key) => this.isPlainObjOrArray(a[key]) ? this.objKeyEquals(a[key], b[key]) : a[key] === b[key]);
          },
          /**
           * Convert imap to array
           * @returns {[K,V][]} Object converted to key value pair
           */
          toArray() {
              return [...this];
          }
      });

      function parseCallback(callbacks, ...objects) {
          // var parse = new MathParser()

          const nums = ["+","-","num",,"int",,-1,-2]


          callbacks = [].concat(callbacks)

          objects = objects.map(o => {
              for (let i = 0; i < callbacks.length; i++) {
                  // 		if (Object(o) !== o) break;
                  const callback = callbacks[i];
                  if (callback == null) continue;
                  var toNum = -1;
                  // (callback && callback != 0 && callback != void 0)
                  if (typeof callback === "boolean") return !o != callback
                  if (o == null) return o
                  o =
                      ((Array.isArray(callback) || null) && (((typeof callback == "function" || null) && tryCallback(callback.shift(), o, ...callback)) ?? ((o[callback] == "function" || null) && (tryCallback(o[callback.shift()], ...callback))))) ??
                      ((~(toNum = nums.indexOf(callback)) || null) && o * (toNum &
                          1 ? -1 : 1)) ??
                          ((callback in Object(o) || null) && (typeof o[callback] == "function" ? tryCallback(o[callback]) : o[callback])) ??
                          // Object(o) === o && callback in o && notNull((typeof o[callback] == "function" ? notNull(tryCallback(o[callback])) : o[callback])) ||
                          ((typeof callback === "function" || null) && tryCallback(callback, o)) ??
                          ((callbacks[i + 1] && callback == "*" || null) && findObj(o, callback[i + 1]))

                  // ).map(aa => aa == void 0 ? "" : aa) : flatten(objects), objects.length == 1 ? objects[0] : objects


              }
              return o
          })
          return objects.length > 1 ? objects : objects[0] // objects =
      }

      function tryCallback(t, ...e) {
          try {
              // return t.call(this, ...e)
              return t(...e)
          } catch (t) {
              return null
          }
      }

      function fieldSorter(...fields) {return (x, y) => Array(fields.length - 1).fill().map((i, j) => [fields[j + 1], fields[j + 0]]).map((o, p) => ((Array.isArray(o) && ([o, p] = o)), ([a, b] = parseCallback(o, x, y)), (-(p < 0) || 1) * (+(a > b) || -(a < b)))).reduce((c, d) => c || d, 0)}

  function sa1(arr,...functions) {return arr.reduce((i,j,k)=>Object.assign(i,{[k=i.findIndex(([m])=>(typeof m === "boolean" && m) || (m instanceof RegExp && m.exec(j)) || (typeof m !== "function" && j == m) || (typeof m === "function" && m(j)))]:[i[k][0],[].concat(i[k][1],[j])]}),functions.map(i=>[i,[]])).map(([,i])=>i)}

      function flatten(...a) {return [...(function* () {
          for (var i = 0, arr = [a], prevarr = []; i < arr.length || prevarr.length; i++)
              if (i == arr.length)[i, arr] = prevarr.pop();
              else if (arr[i] == void 0) continue;
              else if (arr[i][Symbol.iterator] && typeof arr[i] == "object" && !(arr[i] instanceof HTMLFormElement)) {
              prevarr.push([i, arr]);
              arr = arr[i], i = -1
          } else yield arr[i]
      })()]}



          var kv, v,

      [
          [sort] = [],
          [kv] = [],
          [a, ...b]
      ] = sa1([a, sort, ...b], a => ~[-1, 1].indexOf(a), /^(?:(?:(?:k|ke|key)(v|va|val|valu|value)?)|(?:(v|va|val|valu|value)(?:k|ke|key)?)?)$/i, true)

      // if (kv) var [, value, v] = kv.match(kvRegEx)


      if (kv?.includes("v") && typeof a !== "function" || Array.isArray(a) && a.length == 2 && a.every(Array.isArray)) var [k, v] = a
      else var k = a

      if (b.length == 1 && b.every(i=>Array.isArray(i))) b = [].concat(...b)
      var c = [...b.reduce((i, j) => i.set(...[kv?.includes("v") && typeof a === "function" ? parseCallback(k,j) : [parseCallback(k, j), v ? parseCallback(v,j) : j]].flat()), imap)]
      return sort ? c.sort(fieldSorter(sort, [1,"length"])) : c
  }


    /**
     *
     * @param {string} xpath xpath
     * @param {Node} context context node
     * @returns {Node[]} list of nodes
     */
    function $x(xpath, ...context) {
        context = [context, [...arguments].slice(2)].flat(9)
        context = context.length ? context : [document]
        return [...(function*() {
            /**
             * @type {XPathResult}
             */
            var nodesSnapshot
            for (let node of context)
                for (let i = 0, len = (nodesSnapshot = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)).snapshotLength; i < len; i++)
                    yield nodesSnapshot.snapshotItem(i);
        }
        )()].sort((i,j)=>(i.compareDocumentPosition(j) & Node.DOCUMENT_POSITION_PRECEDING) || -1)
    }
}
