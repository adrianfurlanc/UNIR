/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

var SortOrder;
(function (SortOrder) {
    SortOrder[SortOrder["DEFAULT"] = 0] = "DEFAULT";
    SortOrder[SortOrder["ASCENDING"] = 1] = "ASCENDING";
    SortOrder[SortOrder["DESCENDING"] = 2] = "DESCENDING";
})(SortOrder || (SortOrder = {}));
var AttributeName;
(function (AttributeName) {
    AttributeName["table"] = "sortable-id";
    AttributeName["tableHeader"] = "sortable-style";
    AttributeName["cssAscending"] = "sortable-asc";
    AttributeName["cssDescending"] = "sortable-desc";
})(AttributeName || (AttributeName = {}));
class TableState {
    constructor() {
        this.columnIdx = null;
        this.sortOrder = SortOrder.DEFAULT;
        this.defaultOrdering = null;
    }
}
function onHeadClick(evt, tableStates) {
    const htmlEl = evt.target;
    const th = htmlEl.closest("thead th");
    if (th === null) {
        return;
    }
    const table = htmlEl.closest("table");
    const tableBody = table.querySelector("tbody");
    const thArray = Array.from(th.parentNode.children);
    const thIdx = thArray.indexOf(th);
    let tableID = table.getAttribute(AttributeName.table);
    if (tableID === null) {
        tableID = v4().slice(0, 8);
        table.setAttribute(AttributeName.table, tableID);
        tableStates[tableID] = new TableState();
    }
    const tableState = tableStates[tableID];
    thArray.forEach((th, i) => {
        if (i !== thIdx) {
            th.removeAttribute(AttributeName.tableHeader);
        }
    });
    if (tableState.defaultOrdering === null) {
        tableState.defaultOrdering = Array.from(tableBody.rows);
    }
    // sorting the same column, again
    if (tableState.columnIdx === thIdx) {
        tableState.sortOrder = (tableState.sortOrder + 1) % 3;
    }
    // sorting a new column
    else {
        tableState.columnIdx = thIdx;
        tableState.sortOrder = SortOrder.ASCENDING;
    }
    sortTable(tableState, tableBody);
    switch (tableState.sortOrder) {
        case SortOrder.ASCENDING:
            th.setAttribute(AttributeName.tableHeader, AttributeName.cssAscending);
            break;
        case SortOrder.DESCENDING:
            th.setAttribute(AttributeName.tableHeader, AttributeName.cssDescending);
            break;
    }
    // If the current state is now the default one, then forget about this table
    if (tableState.sortOrder === SortOrder.DEFAULT) {
        delete tableStates[tableID];
        table.removeAttribute(AttributeName.table);
        th.removeAttribute(AttributeName.tableHeader);
    }
    // TODO (#16): Remove table state on pane close
}
function sortTable(tableState, tableBody) {
    emptyTable(tableBody, tableState.defaultOrdering);
    if (tableState.sortOrder === SortOrder.DEFAULT) {
        fillTable(tableBody, tableState.defaultOrdering);
        return;
    }
    const xs = [...tableState.defaultOrdering];
    xs.sort((a, b) => compareRows(a, b, tableState.columnIdx, tableState.sortOrder));
    fillTable(tableBody, xs);
}
function resetTable(tableState, tableBody) {
    emptyTable(tableBody, tableState.defaultOrdering);
    fillTable(tableBody, tableState.defaultOrdering);
}
function compareRows(a, b, index, order) {
    let valueA = valueFromCell(a.cells[index]);
    let valueB = valueFromCell(b.cells[index]);
    if (order === SortOrder.DESCENDING) {
        [valueA, valueB] = [valueB, valueA];
    }
    if (typeof (valueA) === "number" && typeof (valueA) === "number") {
        return valueA < valueB ? -1 : 1;
    }
    return valueA.toString().localeCompare(valueB.toString());
}
function tryParseFloat(x) {
    const y = parseFloat(x);
    return isNaN(y) ? x : y;
}
function valueFromCell(element) {
    // TODO: extend to other data-types.
    return tryParseFloat(element.textContent);
}
function emptyTable(tableBody, rows) {
    rows.forEach(() => tableBody.deleteRow(-1));
}
function fillTable(tableBody, rows) {
    rows.forEach((row) => tableBody.appendChild(row));
}

const DEFAULT_SETTINGS = {
    mySetting: 'default'
};
class SortablePlugin extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sortable: loading plugin...');
            yield this.loadSettings();
            this.tableStates = {};
            this.registerDomEvent(document, 'click', (ev) => onHeadClick(ev, this.tableStates));
            console.log('Sortable: loaded plugin.');
        });
    }
    onunload() {
        // iterate through all table elements in the document
        // and remove the table attribute
        const tables = Array.from(document.querySelectorAll('table'));
        for (const table of tables) {
            const tableID = table.getAttribute(AttributeName.table);
            // this table is in the default state
            if (tableID === null) {
                continue;
            }
            const state = this.tableStates[tableID];
            // restore original order
            resetTable(state, table.querySelector('tbody'));
            // remove "sortable" attribute
            table.removeAttribute(AttributeName.table);
            // remove tableHeader attribute
            const th = table.querySelector(`thead th:nth-child(${state.columnIdx + 1})`);
            th.removeAttribute(AttributeName.tableHeader);
            delete this.tableStates[tableID];
        }
        // delete remaining keys in the tableStates object
        // ideally, this should not be necessary, see (#16)
        const remKeys = Object.keys(this.tableStates);
        for (const key of remKeys) {
            delete this.tableStates[key];
        }
        console.log('Sortable: unloaded plugin.');
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
}

module.exports = SortablePlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJzcmMvc29ydGFibGUudHMiLCJzcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6bnVsbCwibmFtZXMiOlsidXVpZHY0IiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdURBO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RSxLQUFLLENBQUMsQ0FBQztBQUNQOztBQzdFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGVBQWUsQ0FBQztBQUNwQixJQUFJLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQixTQUFTLEdBQUcsR0FBRztBQUM5QjtBQUNBLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUN4QjtBQUNBO0FBQ0EsSUFBSSxlQUFlLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQyxlQUFlLElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxJQUFJLE9BQU8sUUFBUSxDQUFDLGVBQWUsS0FBSyxVQUFVLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDclA7QUFDQSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7QUFDMUIsTUFBTSxNQUFNLElBQUksS0FBSyxDQUFDLDBHQUEwRyxDQUFDLENBQUM7QUFDbEksS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEVBQUUsT0FBTyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEM7O0FDbEJBLFlBQWUscUhBQXFIOztBQ0VwSSxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDeEIsRUFBRSxPQUFPLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3REOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDbkI7QUFDQSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0FBQzlCLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFDRDtBQUNBLFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRTtBQUN4QixFQUFFLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyRjtBQUNBO0FBQ0EsRUFBRSxJQUFJLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDO0FBQ3pnQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3ZCLElBQUksTUFBTSxTQUFTLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUNuRCxHQUFHO0FBQ0g7QUFDQSxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ2Q7O0FDeEJBLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ2xDLEVBQUUsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7QUFDMUIsRUFBRSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUN0RDtBQUNBLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xDO0FBQ0EsRUFBRSxJQUFJLEdBQUcsRUFBRTtBQUNYLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLENBQUM7QUFDekI7QUFDQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7QUFDakMsTUFBTSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQyxLQUFLO0FBQ0w7QUFDQSxJQUFJLE9BQU8sR0FBRyxDQUFDO0FBQ2YsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6Qjs7QUNsQkEsSUFBSyxTQUVKO0FBRkQsV0FBSyxTQUFTO0lBQ1YsK0NBQU8sQ0FBQTtJQUFFLG1EQUFTLENBQUE7SUFBRSxxREFBVSxDQUFBO0FBQ2xDLENBQUMsRUFGSSxTQUFTLEtBQVQsU0FBUyxRQUViO0FBRUQsSUFBWSxhQUtYO0FBTEQsV0FBWSxhQUFhO0lBQ3JCLHNDQUFxQixDQUFBO0lBQ3JCLCtDQUE4QixDQUFBO0lBQzlCLDhDQUE2QixDQUFBO0lBQzdCLGdEQUErQixDQUFBO0FBQ25DLENBQUMsRUFMVyxhQUFhLEtBQWIsYUFBYSxRQUt4QjtNQUVZLFVBQVU7SUFBdkI7UUFDSSxjQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ3pCLGNBQVMsR0FBYyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3pDLG9CQUFlLEdBQStCLElBQUksQ0FBQztLQUN0RDtDQUFBO1NBTWUsV0FBVyxDQUFDLEdBQWUsRUFBRSxXQUF5QjtJQUNsRSxNQUFNLE1BQU0sR0FBc0IsR0FBRyxDQUFDLE1BQU8sQ0FBQztJQUU5QyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtRQUFFLE9BQU87S0FBRTtJQUU1QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFbEMsSUFBSSxPQUFPLEdBQWtCLEtBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXJFLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtRQUNsQixPQUFPLEdBQUdBLEVBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0tBQzNDO0lBQ0QsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXhDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7WUFDYixFQUFFLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNqRDtLQUNKLENBQUMsQ0FBQztJQUVILElBQUksVUFBVSxDQUFDLGVBQWUsS0FBSyxJQUFJLEVBQUU7UUFDckMsVUFBVSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzRDs7SUFHRCxJQUFJLFVBQVUsQ0FBQyxTQUFTLEtBQUssS0FBSyxFQUFFO1FBQ2hDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekQ7O1NBRUk7UUFDRCxVQUFVLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUM3QixVQUFVLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7S0FDOUM7SUFFRCxTQUFTLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRWpDLFFBQVEsVUFBVSxDQUFDLFNBQVM7UUFDeEIsS0FBSyxTQUFTLENBQUMsU0FBUztZQUNwQixFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3ZFLE1BQU07UUFDVixLQUFLLFNBQVMsQ0FBQyxVQUFVO1lBQ3JCLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDeEUsTUFBTTtLQUdiOztJQUdELElBQUksVUFBVSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsT0FBTyxFQUFFO1FBQzVDLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLEtBQUssQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ2pEOztBQUdMLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxVQUFzQixFQUFFLFNBQWtDO0lBQ3pFLFVBQVUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRWxELElBQUksVUFBVSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsT0FBTyxFQUFFO1FBQzVDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2pELE9BQU87S0FDVjtJQUVELE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDM0MsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUVqRixTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzdCLENBQUM7U0FFZSxVQUFVLENBQUMsVUFBc0IsRUFBRSxTQUFrQztJQUNqRixVQUFVLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNsRCxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsQ0FBc0IsRUFBRSxDQUFzQixFQUFFLEtBQWEsRUFBRSxLQUFnQjtJQUNoRyxJQUFJLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNDLElBQUksTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFM0MsSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDLFVBQVUsRUFBRTtRQUNoQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztLQUN2QztJQUVELElBQUksUUFBUSxNQUFNLENBQUMsS0FBSyxRQUFRLElBQUksUUFBUSxNQUFNLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDOUQsT0FBTyxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNuQztJQUVELE9BQU8sTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsQ0FBUztJQUM1QixNQUFNLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsT0FBNkI7O0lBRWhELE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsU0FBaUMsRUFBRSxJQUErQjtJQUNsRixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLFNBQWlDLEVBQUUsSUFBK0I7SUFDakYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdEQ7O0FDbElBLE1BQU0sZ0JBQWdCLEdBQXFCO0lBQ3ZDLFNBQVMsRUFBRSxTQUFTO0NBQ3ZCLENBQUM7TUFFbUIsY0FBZSxTQUFRQyxlQUFNO0lBSXhDLE1BQU07O1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBRTNDLE1BQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBRTFCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBRXRCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBYyxLQUFLLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFaEcsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1NBQzNDO0tBQUE7SUFFRCxRQUFROzs7UUFHSixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzlELEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQ3hCLE1BQU0sT0FBTyxHQUFrQixLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7WUFHdkUsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO2dCQUNsQixTQUFTO2FBQ1o7WUFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztZQUd4QyxVQUFVLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFHaEQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBRzNDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsc0JBQXNCLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3RSxFQUFFLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUU5QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDcEM7OztRQUlELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzlDLEtBQUssTUFBTSxHQUFHLElBQUksT0FBTyxFQUFFO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoQztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztLQUM3QztJQUVLLFlBQVk7O1lBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQzlFO0tBQUE7SUFFSyxZQUFZOztZQUNkLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEM7S0FBQTs7Ozs7In0=