// compiled by ocamlc 3.10.2, ocamljs 0.1
var ocamljs$caml_named_value = (function (){
var Match_failure$16g = "Match_failure";
var Out_of_memory$17g = "Out_of_memory";
var Stack_overflow$24g = "Stack_overflow";
var Invalid_argument$18g = "Invalid_argument";
var Failure$19g = "Failure";
var Not_found$20g = "Not_found";
var Sys_error$21g = "Sys_error";
var End_of_file$22g = "End_of_file";
var Division_by_zero$23g = "Division_by_zero";
var Sys_blocked_io$25g = "Sys_blocked_io";
var Assert_failure$26g = "Assert_failure";
var Undefined_recursive_module$27g = "Undefined_recursive_module";
/*
 * This file is part of ocamljs, OCaml to Javascript compiler
 * Copyright (C) 2007 Skydeck, Inc
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Library General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Library General Public License for more details.
 *
 * You should have received a copy of the GNU Library General Public
 * License along with this library; if not, write to the Free
 * Software Foundation, Inc., 59 Temple Place - Suite 330, Boston,
 * MA 02111-1307, USA
 */

var caml_blit_string = function (s1, o1, s2, o2, n) {
  for (var i = 0; i < n; i++)
    oc$$ssetu(s2, o2 + i, oc$$srefu(s1, o1 + i));
}
var caml_callback = function (f, a) { return _(f, [a]); }
var caml_callback2 = function (f, a1, a2) { return _(f, [a1, a2]); }
var caml_callback3 = function (f, a1, a2, a3) { return _(f, [a1, a2, a3]); }
var caml_callback4 = function (f, a1, a2, a3, a4) { return _(f, [a1, a2, a3, a4]); }
var caml_callback5 = function (f, a1, a2, a3, a4, a5) { return _(f, [a1, a2, a3, a4, a5]); }
var caml_callbackN = function (f, n, args) { return _(f, args); }
// XXX caml_callback_exn ?
var compare_val = function (v1, v2, total) {
  var LESS = -1;
  var GREATER = 1;
  var EQUAL = 0;
  var UNORDERED = -2; // XXX ok?

  // XXX needs some work

  if (v1 == v2 && total) return EQUAL;

  var t1 = typeof v1;
  var t2 = typeof v2;
  if (t1 == t2) {
    switch (t1) {
    case "boolean":
      if (v1 < v2) return LESS;
      if (v1 > v2) return GREATER;
      return EQUAL;
    case "number":
      if (v1 < v2) return LESS;
      if (v1 > v2) return GREATER;
      if (v1 != v2) {
	if (!total) return UNORDERED;
	if (v1 == v1) return GREATER;
	if (v2 == v2) return LESS;
	return EQUAL;
      }
      return EQUAL;
    case "string":
      if (v1 < v2) return LESS;
      if (v1 > v2) return GREATER;
      return EQUAL;
    case "function":
      caml_invalid_argument("equal: functional value");
    case "object":
      // like NaN
      if (v1 == null) {
	if (v2 == null) return EQUAL;
	return LESS;
      }
      if (v2 == null) return GREATER;

      // XXX is there a way to get the class of an object as a value?
      // XXX is it worth special casing various JS objects?
      if (v1 instanceof Date) {
	var t1 = v1.getTime();
	var t2 = v2.getTime();
	if (t1 < t2) return LESS;
	if (t1 > t2) return GREATER;
	return EQUAL;
      }
      if (v1 instanceof Array) {
	// we should always either have both tags or neither
	// so it is OK to fall through here
	if (v1.t < v2.t) return LESS;
	if (v1.t > v2.t) return GREATER;
	var sz1 = v1.length;
	var sz2 = v2.length;
	if (sz1 < sz2) return LESS;
	if (sz1 > sz2) return GREATER;
	if (sz1 == 0) return EQUAL;
	for (var i=0; i < sz1; i++)
	  {
	    var c = compare_val(v1[i], v2[i], total);
	    if (c != EQUAL) return c;
	  }
	return EQUAL;
      }
      if (v1 instanceof oc$$ms) {
	var s1 = v1.toString();
	var s2 = v2.toString();
	if (s1 < s2) return LESS;
	if (s1 > s2) return GREATER;
	return EQUAL;
      }
      return UNORDERED; // XXX
    default:
      return UNORDERED;
    }
  }

  // like NaN
  if (v1 == null) {
    if (v2 == null) return EQUAL;
    return LESS;
  }
  if (v2 == null) return GREATER;

  // one boolean and one int
  if (t1 == "boolean" || t2 == "boolean")
  {
    if (v1 < v2) return LESS;
    if (v1 > v2) return GREATER;
    return EQUAL;
  }
  // one mutable and one immutable string
  if (t1 == "string" || t2 == "string")
  {
    var s1 = v1.toString();
    var s2 = v2.toString();
    if (s1 < s2) return LESS;
    if (s1 > s2) return GREATER;
    return EQUAL;
  }
  // one constructor without data (number) and one with (object Array)
  if (t1 == "number") return LESS;
  if (t2 == "number") return GREATER;
  return UNORDERED;
}
var caml_compare = function (v1, v2) {
  var res = compare_val(v1, v2, 1);
  return res < 0 ? -1 : res > 0 ? 1 : 0;
}
var caml_equal = function (v1, v2) { return compare_val(v1, v2, 0) == 0; }
var caml_failwith = function (s) { throw $(Failure$19g, s); }
var caml_fill_string = function(s, o, l, c) {
  for (var i = 0; i < l; i++)
    oc$$ssetu(s, o + i, c);
}
var caml_float_of_string = function (s) {
  var f = parseFloat(s);
  return isNaN(f) ? caml_failwith("float_of_string") : f;
}

var caml_format_int = function(f, a) {
  function parse_format(f) { return f; } // XXX see ints.c
  var f2 = parse_format(f);
  return oc$$sprintf(f2, a);
}

var caml_greaterthan = function (v1, v2) { return compare_val(v1, v2, 0) > 0; }
var caml_greaterequal = function (v1, v2) { return compare_val(v1, v2, 0) >= 0; }
var caml_input_value = function () { throw "caml_input_value"; }
var caml_input_value_from_string = function () { throw "caml_input_value_from_string"; }
var caml_install_signal_handler = function () { throw "caml_install_signal_handler"; }
var caml_int32_compare = function (i1, i2) { return (i1 > i2) - (i1 < i2); }
var caml_int64_compare = function (i1, i2) { throw "caml_int64_compare"; }
var caml_int64_float_of_bits = function (s) {
  // see pervasives.ml; int64s are represented by strings
  switch (s) {
  case "9218868437227405312": return Number.POSITIVE_INFINITY;
  case "-4503599627370496": return Number.NEGATIVE_INFINITY;
  case "9218868437227405313": return Number.NaN;
  case "9218868437227405311" : return Number.MAX_VALUE;
  case "4503599627370496": return Number.MIN_VALUE;
  case "4372995238176751616": return 0; // XXX how to get epsilon in js?
  default: return 0;
  }
}
var caml_int_of_string = function (s) {
  var i = parseInt(s, 10);
  return isNaN(i) ? caml_failwith("int_of_string") : i;
}
var caml_invalid_argument = function (s) { throw $(Invalid_argument$18g, s); }
var caml_is_printable = function (c) { return c > 21 && c < 127; } // XXX get this right
var caml_lessthan = function (v1, v2) { return compare_val(v1, v2, 0) -1 < -1; }
var caml_lessequal = function (v1, v2) { return compare_val(v1, v2, 0) -1 <= -1; }
var caml_make_vect = function (l, i) {
  var a = new Array(l);
  for (var j = 0; j < l; j++)
    a[j] = i;
  return a;
}
var caml_marshal_data_size = function () { throw "caml_marshal_data_size"; }
var caml_md5_chan = function () { throw "caml_md5_chan"; }
var caml_md5_string = function () { throw "caml_md5_string"; }
var caml_ml_channel_size = function () { throw "caml_ml_channel_size"; }
var caml_ml_channel_size_64 = function () { throw "caml_ml_channel_size_64"; }
var caml_ml_close_channel = function () { throw "caml_ml_close_channel"; }

// see print_endline hack below
var caml_ml_flush = function (c) { }

var caml_ml_input = function () { throw "caml_ml_input"; }
var caml_ml_input_char = function () { throw "caml_ml_input_char"; }
var caml_ml_input_int = function () { throw "caml_ml_input_int"; }
var caml_ml_input_scan_line = function () { throw "caml_ml_input_scan_line"; }
var caml_ml_open_descriptor_in = function () { return 0; } // XXX
var caml_ml_open_descriptor_out = function () { return 0; } // XXX
var caml_ml_out_channels_list = function () { return 0; }

// this is a hack to make print_endline work in the standalone js
// interpreter for running tests
var caml_ml_output = function (c, b, s, l) { print(b); }
var caml_ml_output_char = function (c, ch) {  }

var caml_ml_output_int = function () { throw "caml_ml_output_int"; }
var caml_ml_pos_in = function () { throw "caml_ml_pos_in"; }
var caml_ml_pos_in_64 = function () { throw "caml_ml_pos_in_64"; }
var caml_ml_pos_out = function () { throw "caml_ml_pos_out"; }
var caml_ml_pos_out_64 = function () { throw "caml_ml_pos_out_64"; }
var caml_ml_seek_in = function () { throw "caml_ml_seek_in"; }
var caml_ml_seek_in_64 = function () { throw "caml_ml_seek_in_64"; }
var caml_ml_seek_out = function () { throw "caml_ml_seek_out"; }
var caml_ml_seek_out_64 = function () { throw "caml_ml_seek_out_64"; }
var caml_ml_set_binary_mode = function () { throw "caml_ml_set_binary_mode"; }
var caml_named_value = function (n) { return oc$$nv[n]; }
var caml_nativeint_compare = function (i1, i2) { return (i1 > i2) - (i1 < i2); }
var caml_notequal = function (v1, v2) { return compare_val(v1, v2, 0) != 0; }
var caml_obj_dup = function (a) {
  var l = a.length;
  var d = new Array(l);
  for (var i=0; i < l; i++)
    d[i] = a[i];
  d.t = a.t;
  return d;
}
var caml_obj_is_block = function (o) { return !(typeof o == 'number') }
var caml_obj_tag = function(o) { return o.t; }
var caml_obj_set_tag = function(o, t) { o.$t = t; }
var caml_obj_block = function(t, s) { if (s == 0) return t; else { var a = new Array(s); a.$t = t; return a; } }
var caml_obj_truncate = function(o, s) { o.length = s; }
var caml_output_value = function () { throw "caml_output_value"; }
var caml_output_value_to_string = function () { throw "caml_output_value_to_string"; }
var caml_output_value_to_buffer = function () { throw "caml_output_value_to_buffer"; }
var caml_register_named_value = function (n, v) { oc$$nv[n] = v; }
var caml_string_compare = function (s1, s2) {
  if (oc$$slt(s1, s2)) return -1;
  else if (oc$$sgt(s1, s2)) return 1;
  else return 0;
}
var caml_sys_exit = function () { throw "caml_sys_exit"; }
  var init_time = (new Date()).getTime() / 1000;
var caml_sys_time = function () { return (new Date()).getTime() / 1000 - init_time; }
var caml_sys_get_argv = function () { return $("", $()); } // XXX put something here?
var caml_sys_get_config = function () { return $("js", 32); } // XXX browser name?
var caml_sys_open = function () { throw "caml_sys_open"; }
var caml_sys_random_seed = function() { throw "caml_sys_random_seed"; }
/*
 * This file is part of ocamljs, OCaml to Javascript compiler
 * Copyright (C) 2007 Skydeck, Inc
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Library General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Library General Public License for more details.
 *
 * You should have received a copy of the GNU Library General Public
 * License along with this library; if not, write to the Free
 * Software Foundation, Inc., 59 Temple Place - Suite 330, Boston,
 * MA 02111-1307, USA
 */

/*
function console_log(s) {
  var cs = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces["nsIConsoleService"]);
  cs.logStringMessage(s);
}
*/

var oc$$nv = {}

// XXX name these sensibly and compactify code afterwards

function ___m(m, t, a)
{
  function ap(a1, a2) {
    var a = new Array();
    for (var i=0; i < a1.length; i++) a.push(a1[i]);
    for (var i=0; i < a2.length; i++) a.push(a2[i]);
    return a;
  }

  while (true) {
    // non-ocamljs functions can't be under/over-applied
    if (!m.$oc)
      return m.apply(t, a);

    var al = a.length;
    var ml = m.length;

    if (al < ml)
    {
      switch (ml - al) {
      case 1: return _f(function (z) { return m.apply(t, ap(a, arguments)) });
      case 2: return _f(function (z,y) { return m.apply(t, ap(a, arguments)) });
      case 3: return _f(function (z,y,x) { return m.apply(t, ap(a, arguments)) });
      case 4: return _f(function (z,y,x,w) { return m.apply(t, ap(a, arguments)) });
      case 5: return _f(function (z,y,x,w,v) { return m.apply(t, ap(a, arguments)) });
      case 6: return _f(function (z,y,x,w,v,u) { return m.apply(t, ap(a, arguments)) });
      case 7: return _f(function (z,y,x,w,v,u,s) { return m.apply(t, ap(a, arguments)) });
      default: throw "unimplemented";
      }
    }
    else if (al == ml)
      return m.apply(t, a);
    else // al > ml
    {
      m = _m(m, t, a.slice(0, ml));
      t = m;
      a = a.slice(ml);
    }
  }
}

/*@cc_on @if (@_win32 && @_jscript_version >= 5)
function ___m(m, t, a)
{
  function ap(a1, a2) {
    var a = new Array();
    for (var i=0; i < a1.length; i++) a.push(a1[i]);
    for (var i=0; i < a2.length; i++) a.push(a2[i]);
    return a;
  }

  while (true) {
    // non-ocamljs functions can't be under/over-applied
    if (!m.$oc) {
      if (m.apply)
        return m.apply(t, a);
      else
        // IE < 8 doesn't support apply for DOM methods, but does support "cached" methods bound to an object
        switch (a.length) {
        case 0: return m();
        case 1: return m(a[0]);
        case 2: return m(a[0], a[1]);
        case 3: return m(a[0], a[1], a[2]);
        case 4: return m(a[0], a[1], a[2], a[3]);
        case 5: return m(a[0], a[1], a[2], a[3], a[4]);
        case 6: return m(a[0], a[1], a[2], a[3], a[4], a[5]);
        case 7: return m(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
        default: throw "unimplemented";
        }
    }

    var al = a.length;
    var ml = m.length;

    if (al < ml)
    {
      switch (ml - al) {
      case 1: return _f(function (z) { return m.apply(t, ap(a, arguments)) });
      case 2: return _f(function (z,y) { return m.apply(t, ap(a, arguments)) });
      case 3: return _f(function (z,y,x) { return m.apply(t, ap(a, arguments)) });
      case 4: return _f(function (z,y,x,w) { return m.apply(t, ap(a, arguments)) });
      case 5: return _f(function (z,y,x,w,v) { return m.apply(t, ap(a, arguments)) });
      case 6: return _f(function (z,y,x,w,v,u) { return m.apply(t, ap(a, arguments)) });
      case 7: return _f(function (z,y,x,w,v,u,s) { return m.apply(t, ap(a, arguments)) });
      default: throw "unimplemented";
      }
    }
    else if (al == ml)
      return m.apply(t, a);
    else // al > ml
    {
      m = _m(m, t, a.slice(0, ml));
      t = m;
      a = a.slice(ml);
    }
  }
}
@end @*/

// tail call
function __m(m, t, args)
{
  args.$m = m;
  args.$t = t;
  args.$tr = true;
  return args;
}
function __(t, args) { return __m(t, t, args); }

// non tail call
function _m(m, t, args)
{
  var v = __m(m, t, args);
  while (v && v.$tr)
    v = ___m(v.$m, v.$t, v);
  return v;
}
function _(t, args) { return _m(t, t, args); }

function _f(f) {
  f.$oc = true;
  return f;
}

function $N(t, a) {
  var l = a.length;
  var b = new Array(l);
  for (var i=0; i < l; i++)
    b[i] = a[i];
  b.t = t;
  return b;
}
function $() { return $N(0, arguments); }
function $1() { return $N(1, arguments); }
function $2() { return $N(2, arguments); }
function $3() { return $N(3, arguments); }
function $4() { return $N(4, arguments); }
function $5() { return $N(5, arguments); }
function $6() { return $N(6, arguments); }
function $7() { return $N(7, arguments); }
function $8() { return $N(8, arguments); }
function $9() { return $N(9, arguments); }
function $t(a) { return a.t; }

function $xM(t) { return { $t: t }; }
function $xN(t, a) { a.$t = t; return a; }
function $xt(a) { return a.$t; }

function oc$$arefs(o, i) {
  return i < o.length ? o[i] : oc$Pervasives$[0]("index out of bounds");
}
function oc$$asets(o, i, v) {
  return i < o.length ? o[i] = v : oc$Pervasives$[0]("index out of bounds");
}

// mutable strings, argh

function oc$$ms(a) {
  this.a = a;
  this.length = a.length;
}

// XXX cache the string rep?
oc$$ms.prototype.toString = function () { return String.fromCharCode.apply(null, this.a); }

function oc$$lms(s) {
  var l = s.length;
  var a = new Array(l);
  for (var i = 0; i < l; i++)
    a[i] = s.charCodeAt(i);
  return new oc$$ms(a);
}
function oc$$cms(n) {
  return new oc$$ms(new Array(n));
}
function oc$$srefu(o, i) { return typeof o == "string" ? o.charCodeAt(i) : o.a[i]; }
function oc$$ssetu(o, i, v) { o.a[i] = v; }
function oc$$srefs(o, i) {
  return i < o.length ? oc$$srefu(o, i) : oc$Pervasives$[0]("index out of bounds");
}
function oc$$ssets(o, i, v) {
  return i < o.length ? oc$$ssetu(o, i, v) : oc$Pervasives$[0]("index out of bounds");
}

function oc$$seq(s1, s2) { return s1.toString() == s2.toString(); }
function oc$$sneq(s1, s2) { return s1.toString() != s2.toString(); }
function oc$$slt(s1, s2) { return s1.toString() < s2.toString(); }
function oc$$sgt(s1, s2) { return s1.toString() > s2.toString(); }
function oc$$slte(s1, s2) { return s1.toString() <= s2.toString(); }
function oc$$sgte(s1, s2) { return s1.toString() >= s2.toString(); }

/*
**  sprintf.js -- POSIX sprintf(3) style formatting function for JavaScript
**  Copyright (c) 2006-2007 Ralf S. Engelschall <rse@engelschall.com>
**  Partly based on Public Domain code by Jan Moesen <http://jan.moesen.nu/>
**  Licensed under GPL <http://www.gnu.org/licenses/gpl.txt>
**
**  modified for ocamljs to more closely match Linux
**
**  $LastChangedDate$
**  $LastChangedRevision$
*/

/*  make sure the ECMAScript 3.0 Number.toFixed() method is available  */
if (typeof Number.prototype.toFixed != "undefined") {
    (function(){
        /*  see http://www.jibbering.com/faq/#FAQ4_6 for details  */
        function Stretch(Q, L, c) {
            var S = Q
            if (c.length > 0)
                while (S.length < L)
                    S = c+S;
            return S;
        }
        function StrU(X, M, N) { /* X >= 0.0 */
            var T, S;
            S = new String(Math.round(X * Number("1e"+N)));
            if (S.search && S.search(/\D/) != -1)
                return ''+X;
            with (new String(Stretch(S, M+N, '0')))
                return substring(0, T=(length-N)) + '.' + substring(T);
        }
        function Sign(X) {
            return X < 0 ? '-' : '';
        }
        function StrS(X, M, N) {
            return Sign(X)+StrU(Math.abs(X), M, N);
        }
        Number.prototype.toFixed = function (n) { return StrS(this, 1, n) };
    })();
}

/*  the sprintf() function  */
var oc$$sprintf = function () {
    /*  argument sanity checking  */
    if (!arguments || arguments.length < 1)
        alert("sprintf:ERROR: not enough arguments 1");

    /*  initialize processing queue  */
    var argumentnum = 0;
    var done = "", todo = arguments[argumentnum++];

    /*  parse still to be done format string  */
    var m;
    while ((m = /^([^%]*)%(\d+$)?([#0 +'-]+)?(\*|\d+)?(\.\*|\.\d+)?([%dioulLnNxXfFgGcs])(.*)$/.exec(todo))) {
        var pProlog    = m[1],
            pAccess    = m[2],
            pFlags     = m[3],
            pMinLength = m[4],
            pPrecision = m[5],
            pType      = m[6],
            pEpilog    = m[7];

        /*  determine substitution  */
        var subst;
        if (pType == '%')
            /*  special case: escaped percent character  */
            subst = '%';
        else {
            /*  parse padding and justify aspects of flags  */
            var padWith = ' ';
            var justifyRight = true;
            if (pFlags) {
                if (pFlags.indexOf('0') >= 0)
                    padWith = '0';
                if (pFlags.indexOf('-') >= 0) {
                    padWith = ' ';
                    justifyRight = false;
                }
            }
            else
                pFlags = "";

            /*  determine minimum length  */
            var minLength = -1;
            if (pMinLength) {
                if (pMinLength == "*") {
                    var access = argumentnum++;
                    if (access >= arguments.length)
                        alert("sprintf:ERROR: not enough arguments 2");
                    minLength = arguments[access];
                }
                else
                    minLength = parseInt(pMinLength, 10);
            }

            /*  determine precision  */
            var precision = -1;
            if (pPrecision) {
                if (pPrecision == ".*") {
                    var access = argumentnum++;
                    if (access >= arguments.length)
                        alert("sprintf:ERROR: not enough arguments 3");
                    precision = arguments[access];
                }
                else
                    precision = parseInt(pPrecision.substring(1), 10);
            }

            /*  determine how to fetch argument  */
            var access = argumentnum++;
            if (pAccess)
                access = parseInt(pAccess.substring(0, pAccess.length - 1), 10);
            if (access >= arguments.length)
                alert("sprintf:ERROR: not enough arguments 4");

            /*  dispatch into expansions according to type  */
            var prefix = "";
            switch (pType) {
                case 'd':
                case 'i':
                    subst = arguments[access];
                    if (typeof subst != "number")
                        subst = 0;
                    subst = subst.toString(10);
                    if (pFlags.indexOf('#') >= 0 && subst >= 0)
                        subst = "+" + subst;
                    if (pFlags.indexOf(' ') >= 0 && subst >= 0)
                        subst = " " + subst;
                    break;
                case 'o':
                    subst = arguments[access];
                    if (typeof subst != "number")
                        subst = 0;
                    subst = subst.toString(8);
                    break;
                case 'u':
                case 'l':
                case 'L':
                case 'n':
                case 'N':
                    subst = arguments[access];
                    if (typeof subst != "number")
                        subst = 0;
                    subst = Math.abs(subst);
                    subst = subst.toString(10);
                    break;
                case 'x':
                    subst = arguments[access];
                    if (typeof subst != "number")
                        subst = 0;
                    subst = subst.toString(16).toLowerCase();
                    if (pFlags.indexOf('#') >= 0)
                        prefix = "0x";
                    break;
                case 'X':
                    subst = arguments[access];
                    if (typeof subst != "number")
                        subst = 0;
                    subst = subst.toString(16).toUpperCase();
                    if (pFlags.indexOf('#') >= 0)
                        prefix = "0X";
                    break;
                case 'f':
                case 'F':
                case 'g':
                case 'G':
                    subst = arguments[access];
                    if (typeof subst != "number")
                        subst = 0.0;
                    subst = 0.0 + subst;
                    if (precision > -1) {
                        if (subst.toFixed)
                            subst = subst.toFixed(precision);
                        else {
                            subst = (Math.round(subst * Math.pow(10, precision)) / Math.pow(10, precision));
                            subst += "0000000000";
                            subst = subst.substr(0, subst.indexOf(".")+precision+1);
                        }
                    }
                    subst = '' + subst;
                    if (pFlags.indexOf("'") >= 0) {
                        var k = 0;
                        for (var i = (subst.length - 1) - 3; i >= 0; i -= 3) {
                            subst = subst.substring(0, i) + (k == 0 ? "." : ",") + subst.substring(i);
                            k = (k + 1) % 2;
                        }
                    }
                    subst = subst.replace('Infinity', 'inf');
                    subst = subst.replace('NaN', 'nan');
                    break;
                case 'c':
                    subst = arguments[access];
                    if (typeof subst != "number")
                        subst = 0;
                    subst = String.fromCharCode(subst);
                    break;
                case 's':
                    subst = arguments[access];
                    if (precision > -1)
                        subst = subst.substr(0, precision);
                    if (typeof subst != "string")
                        subst = "";
                    break;
            }

            /*  apply optional padding  */
            var padding = minLength - subst.toString().length - prefix.toString().length;
            if (padding > 0) {
                var arrTmp = new Array(padding + 1);
                if (justifyRight)
                    subst = arrTmp.join(padWith) + subst;
                else
                    subst = subst + arrTmp.join(padWith);
            }

            /*  add optional prefix  */
            subst = prefix + subst;
        }

        /*  update the processing queue  */
        done = done + pProlog + subst;
        todo = pEpilog;
    }
    return (done + todo);
};

/*@cc_on @if (@_win32 && @_jscript_version >= 5) if (!window.XMLHttpRequest)
window.XMLHttpRequest = function() { return new ActiveXObject('Microsoft.XMLHTTP') };
@end @*/
var oc$Pervasives$ =
  function () {
    var failwith$38 = _f(function (s$39) { throw $(Failure$19g, s$39); });
    var invalid_arg$40 = _f(function (s$41) { throw $(Invalid_argument$18g, s$41); });
    var Exit$42 = $("Pervasives.Exit");
    var min$50 = _f(function (x$51, y$52) { if (caml_lessequal(x$51, y$52)) return x$51;
                                            return y$52; });
    var max$53 = _f(function (x$54, y$55) { if (caml_greaterequal(x$54, y$55)) return x$54;
                                            return y$55; });
    var abs$71 = _f(function (x$72) { if (x$72 >= 0) return x$72;
                                      return -x$72; });
    var lnot$76 = _f(function (x$77) { return x$77 ^ -1; });
    var min_int$81 = 1 << (1 << 31 === 0 ? 30 : 62);
    var max_int$82 = min_int$81 - 1;
    var infinity$115 = caml_int64_float_of_bits("9218868437227405312");
    var neg_infinity$116 = caml_int64_float_of_bits("-4503599627370496");
    var nan$117 = caml_int64_float_of_bits("9218868437227405313");
    var max_float$118 = caml_int64_float_of_bits("9218868437227405311");
    var min_float$119 = caml_int64_float_of_bits("4503599627370496");
    var epsilon_float$120 = caml_int64_float_of_bits("4372995238176751616");
    var $5E$136 =
      _f(function (s1$137, s2$138) {
           var l1$139 = s1$137.length;
           var l2$140 = s2$138.length;
           var s$141 = oc$$cms(l1$139 + l2$140);
           caml_blit_string(s1$137, 0, s$141, 0, l1$139);
           caml_blit_string(s2$138, 0, s$141, l1$139, l2$140);
           return s$141;
         });
    var char_of_int$144 =
      _f(function (n$145) { if (n$145 < 0 || n$145 > 255) return __(invalid_arg$40, ["char_of_int"]);
                            return n$145; });
    var string_of_bool$151 = _f(function (b$152) { if (b$152) return "true";
                                                   return "false"; });
    var bool_of_string$153 =
      _f(function (param$415) {
           if (!oc$$sneq(param$415, "false")) return 0;
           if (oc$$sneq(param$415, "true")) return __(invalid_arg$40, ["bool_of_string"]);
           return 1;
         });
    var string_of_int$154 = _f(function (n$155) { return caml_format_int("%d", n$155); });
    var String$158 = $();
    var valid_float_lexem$159 =
      _f(function (s$160) {
           var l$161 = s$160.length;
           var loop$162 =
             _f(function (i$163) {
                  if (i$163 >= l$161) return __($5E$136, [s$160, "."]);
                  var match$414 = oc$$srefs(s$160, i$163);
                  var $r58 = false;
                  r$58: {
                    if (!(match$414 >= 48)) { if (!(match$414 !== 45)) { $r58 = true;
                                                                    break r$58; }
                                              return s$160; }
                    if (!(match$414 >= 58)) { $r58 = true;
                                              break r$58; }
                    return s$160;
                  }
                  if ($r58) return __(loop$162, [i$163 + 1]);
                });
           return __(loop$162, [0]);
         });
    var string_of_float$164 = _f(function (f$165) { return __(valid_float_lexem$159, [oc$$sprintf("%.12g", f$165)]); });
    var $40$167 =
      _f(function (l1$168, l2$169) { if (l1$168) return $(l1$168[0], _($40$167, [l1$168[1], l2$169]));
                                     return l2$169; });
    var stdin$176 = caml_ml_open_descriptor_in(0);
    var stdout$177 = caml_ml_open_descriptor_out(1);
    var stderr$178 = caml_ml_open_descriptor_out(2);
    var open_out_gen$199 =
      _f(function (mode$200, perm$201, name$202) {
           return caml_ml_open_descriptor_out(caml_sys_open(name$202, mode$200, perm$201));
         });
    var open_out$203 = _f(function (name$204) { return __(open_out_gen$199, [$(1, $(3, $(4, $(7, 0)))), 438, name$204]); });
    var open_out_bin$205 = _f(function (name$206) { return __(open_out_gen$199, [$(1, $(3, $(4, $(6, 0)))), 438, name$206]); });
    var flush_all$209 =
      _f(function (param$411) {
           var iter$210 =
             _f(function (param$412) {
                  if (param$412)
                  {
                    try { caml_ml_flush(param$412[0]); } catch (exn$413) { ; }
                    return __(iter$210, [param$412[1]]);
                  }
                  return 0;
                });
           return __(iter$210, [caml_ml_out_channels_list(0)]);
         });
    var output_string$215 = _f(function (oc$216, s$217) { return caml_ml_output(oc$216, s$217, 0, s$217.length); });
    var output$218 =
      _f(function (oc$219, s$220, ofs$221, len$222) {
           if (ofs$221 < 0 || (len$222 < 0 || ofs$221 > s$220.length - len$222)) return __(invalid_arg$40, ["output"]);
           return caml_ml_output(oc$219, s$220, ofs$221, len$222);
         });
    var output_value$226 = _f(function (chan$227, v$228) { return caml_output_value(chan$227, v$228, 0); });
    var close_out$233 = _f(function (oc$234) { caml_ml_flush(oc$234);
                                               return caml_ml_close_channel(oc$234); });
    var close_out_noerr$235 =
      _f(function (oc$236) {
           try { caml_ml_flush(oc$236); } catch (exn$410) { ; }
           try { return caml_ml_close_channel(oc$236); } catch (exn$409) { return 0; }
         });
    var open_in_gen$238 =
      _f(function (mode$239, perm$240, name$241) {
           return caml_ml_open_descriptor_in(caml_sys_open(name$241, mode$239, perm$240));
         });
    var open_in$242 = _f(function (name$243) { return __(open_in_gen$238, [$(0, $(7, 0)), 0, name$243]); });
    var open_in_bin$244 = _f(function (name$245) { return __(open_in_gen$238, [$(0, $(6, 0)), 0, name$245]); });
    var input$248 =
      _f(function (ic$249, s$250, ofs$251, len$252) {
           if (ofs$251 < 0 || (len$252 < 0 || ofs$251 > s$250.length - len$252)) return __(invalid_arg$40, ["input"]);
           return caml_ml_input(ic$249, s$250, ofs$251, len$252);
         });
    var unsafe_really_input$253 =
      _f(function (ic$254, s$255, ofs$256, len$257) {
           if (len$257 <= 0) return 0;
           var r$258 = caml_ml_input(ic$254, s$255, ofs$256, len$257);
           if (r$258 === 0) throw $(End_of_file$22g);
           return __(unsafe_really_input$253, [ic$254, s$255, ofs$256 + r$258, len$257 - r$258]);
         });
    var really_input$259 =
      _f(function (ic$260, s$261, ofs$262, len$263) {
           if (ofs$262 < 0 || (len$263 < 0 || ofs$262 > s$261.length - len$263)) return __(invalid_arg$40, ["really_input"]);
           return __(unsafe_really_input$253, [ic$260, s$261, ofs$262, len$263]);
         });
    var input_line$265 =
      _f(function (chan$266) {
           var build_result$267 =
             _f(function (buf$268, pos$269, param$408) {
                  if (param$408)
                  {
                    var hd$270 = param$408[0];
                    var len$272 = hd$270.length;
                    caml_blit_string(hd$270, 0, buf$268, pos$269 - len$272, len$272);
                    return __(build_result$267, [buf$268, pos$269 - len$272, param$408[1]]);
                  }
                  return buf$268;
                });
           var scan$273 =
             _f(function (accu$274, len$275) {
                  var n$276 = caml_ml_input_scan_line(chan$266);
                  if (!(n$276 === 0))
                  {
                    if (n$276 > 0)
                    {
                      var res$277 = oc$$cms(n$276 - 1);
                      caml_ml_input(chan$266, res$277, 0, n$276 - 1);
                      ;
                      caml_ml_input_char(chan$266);
                      ;
                      if (accu$274)
                      {
                        var len$278 = len$275 + n$276 - 1;
                        return __(build_result$267, [oc$$cms(len$278), len$278, $(res$277, accu$274)]);
                      }
                      return res$277;
                    }
                    var beg$279 = oc$$cms(-n$276);
                    caml_ml_input(chan$266, beg$279, 0, -n$276);
                    ;
                    return __(scan$273, [$(beg$279, accu$274), len$275 - n$276]);
                  }
                  if (accu$274) return __(build_result$267, [oc$$cms(len$275), len$275, accu$274]);
                  throw $(End_of_file$22g);
                });
           return __(scan$273, [0, 0]);
         });
    var close_in_noerr$287 = _f(function (ic$288) { try { return caml_ml_close_channel(ic$288); } catch (exn$407) { return 0; } });
    var print_char$290 = _f(function (c$291) { return caml_ml_output_char(stdout$177, c$291); });
    var print_string$292 = _f(function (s$293) { return __(output_string$215, [stdout$177, s$293]); });
    var print_int$294 = _f(function (i$295) { return __(output_string$215, [stdout$177, _(string_of_int$154, [i$295])]); });
    var print_float$296 = _f(function (f$297) { return __(output_string$215, [stdout$177, _(string_of_float$164, [f$297])]); });
    var print_endline$298 =
      _f(function (s$299) {
           _(output_string$215, [stdout$177, s$299]);
           caml_ml_output_char(stdout$177, 10);
           return caml_ml_flush(stdout$177);
         });
    var print_newline$300 = _f(function (param$406) { caml_ml_output_char(stdout$177, 10);
                                                      return caml_ml_flush(stdout$177); });
    var prerr_char$301 = _f(function (c$302) { return caml_ml_output_char(stderr$178, c$302); });
    var prerr_string$303 = _f(function (s$304) { return __(output_string$215, [stderr$178, s$304]); });
    var prerr_int$305 = _f(function (i$306) { return __(output_string$215, [stderr$178, _(string_of_int$154, [i$306])]); });
    var prerr_float$307 = _f(function (f$308) { return __(output_string$215, [stderr$178, _(string_of_float$164, [f$308])]); });
    var prerr_endline$309 =
      _f(function (s$310) {
           _(output_string$215, [stderr$178, s$310]);
           caml_ml_output_char(stderr$178, 10);
           return caml_ml_flush(stderr$178);
         });
    var prerr_newline$311 = _f(function (param$405) { caml_ml_output_char(stderr$178, 10);
                                                      return caml_ml_flush(stderr$178); });
    var read_line$312 = _f(function (param$404) { caml_ml_flush(stdout$177);
                                                  return __(input_line$265, [stdin$176]); });
    var read_int$313 = _f(function (param$403) { return caml_int_of_string(_(read_line$312, [0])); });
    var read_float$314 = _f(function (param$402) { return caml_float_of_string(_(read_line$312, [0])); });
    var LargeFile$321 = $();
    var $5E$5E$336 = _f(function (fmt1$337, fmt2$338) { return _($5E$136, [fmt1$337, fmt2$338]); });
    var string_of_format$339 =
      _f(function (fmt$340) {
           var s$341 = fmt$340;
           var l$342 = s$341.length;
           var r$343 = oc$$cms(l$342);
           caml_blit_string(s$341, 0, r$343, 0, l$342);
           return r$343;
         });
    var exit_function$345 = $(flush_all$209);
    var at_exit$346 =
      _f(function (f$347) {
           var g$348 = exit_function$345[0];
           return exit_function$345[0] = _f(function (param$401) { _(f$347, [0]);
                                                                   return __(g$348, [0]); });
         });
    var do_at_exit$349 = _f(function (param$400) { return __(exit_function$345[0], [0]); });
    var exit$350 = _f(function (retcode$351) { _(do_at_exit$349, [0]);
                                               return caml_sys_exit(retcode$351); });
    caml_register_named_value("Pervasives.do_at_exit", do_at_exit$349);
    return $(invalid_arg$40, failwith$38, Exit$42, min$50, max$53, abs$71, 
           max_int$82, min_int$81, lnot$76, infinity$115, neg_infinity$116, 
           nan$117, max_float$118, min_float$119, epsilon_float$120, 
           $5E$136, char_of_int$144, string_of_bool$151, bool_of_string$153, 
           string_of_int$154, string_of_float$164, $40$167, stdin$176, 
           stdout$177, stderr$178, print_char$290, print_string$292, 
           print_int$294, print_float$296, print_endline$298, print_newline$300, 
           prerr_char$301, prerr_string$303, prerr_int$305, prerr_float$307, 
           prerr_endline$309, prerr_newline$311, read_line$312, read_int$313, 
           read_float$314, open_out$203, open_out_bin$205, open_out_gen$199,
           _f(function (prim$368) { return caml_ml_flush(prim$368); }), 
           flush_all$209, _f(function (prim$370, prim$369) { return caml_ml_output_char(prim$370, prim$369); }), 
           output_string$215, output$218, _f(function (prim$372, prim$371) { return caml_ml_output_char(prim$372, prim$371); }),
           _f(function (prim$374, prim$373) { return caml_ml_output_int(prim$374, prim$373); }), 
           output_value$226, _f(function (prim$376, prim$375) { return caml_ml_seek_out(prim$376, prim$375); }),
           _f(function (prim$377) { return caml_ml_pos_out(prim$377); }),
           _f(function (prim$378) { return caml_ml_channel_size(prim$378); }), 
           close_out$233, close_out_noerr$235,
           _f(function (prim$380, prim$379) { return caml_ml_set_binary_mode(prim$380, prim$379); }), 
           open_in$242, open_in_bin$244, open_in_gen$238, _f(function (prim$381) { return caml_ml_input_char(prim$381); }),
           input_line$265, input$248, really_input$259, _f(function (prim$382) { return caml_ml_input_char(prim$382); }),
           _f(function (prim$383) { return caml_ml_input_int(prim$383); }),
           _f(function (prim$384) { return caml_input_value(prim$384); }),
           _f(function (prim$386, prim$385) { return caml_ml_seek_in(prim$386, prim$385); }),
           _f(function (prim$387) { return caml_ml_pos_in(prim$387); }),
           _f(function (prim$388) { return caml_ml_channel_size(prim$388); }),
           _f(function (prim$389) { return caml_ml_close_channel(prim$389); }), 
           close_in_noerr$287, _f(function (prim$391, prim$390) { return caml_ml_set_binary_mode(prim$391, prim$390); }),
           $(_f(function (prim$393, prim$392) { return caml_ml_seek_out_64(prim$393, prim$392); }),
           _f(function (prim$394) { return caml_ml_pos_out_64(prim$394); }),
           _f(function (prim$395) { return caml_ml_channel_size_64(prim$395); }),
           _f(function (prim$397, prim$396) { return caml_ml_seek_in_64(prim$397, prim$396); }),
           _f(function (prim$398) { return caml_ml_pos_in_64(prim$398); }),
           _f(function (prim$399) { return caml_ml_channel_size_64(prim$399); })), 
           string_of_format$339, $5E$5E$336, exit$350, at_exit$346, valid_float_lexem$159, 
           unsafe_really_input$253, do_at_exit$349);
  }();
var oc$List$ =
  function () {
    var length_aux$58 =
      _f(function (len$59, param$394) { if (param$394) return __(length_aux$58, [len$59 + 1, param$394[1]]);
                                        return len$59; });
    var length$62 = _f(function (l$63) { return __(length_aux$58, [0, l$63]); });
    var hd$64 = _f(function (param$393) { if (param$393) return param$393[0];
                                          return __(oc$Pervasives$[1], ["hd"]); });
    var tl$67 = _f(function (param$392) { if (param$392) return param$392[1];
                                          return __(oc$Pervasives$[1], ["tl"]); });
    var nth$70 =
      _f(function (l$71, n$72) {
           if (n$72 < 0) return __(oc$Pervasives$[0], ["List.nth"]);
           var nth_aux$73 =
             _f(function (l$74, n$75) {
                  if (!l$74) return __(oc$Pervasives$[1], ["nth"]);
                  if (n$75 === 0) return l$74[0];
                  return __(nth_aux$73, [l$74[1], n$75 - 1]);
                });
           return __(nth_aux$73, [l$71, n$72]);
         });
    var append$78 = oc$Pervasives$[21];
    var rev_append$79 =
      _f(function (l1$80, l2$81) { if (l1$80) return __(rev_append$79, [l1$80[1], $(l1$80[0], l2$81)]);
                                   return l2$81; });
    var rev$84 = _f(function (l$85) { return __(rev_append$79, [l$85, 0]); });
    var flatten$86 =
      _f(function (param$391) {
           if (param$391) return __(oc$Pervasives$[21], [param$391[0], _(flatten$86, [param$391[1]])]);
           return 0;
         });
    var map$90 =
      _f(function (f$91, param$390) {
           if (param$390) { var r$94 = _(f$91, [param$390[0]]);
                            return $(r$94, _(map$90, [f$91, param$390[1]])); }
           return 0;
         });
    var rev_map$95 =
      _f(function (f$96, l$97) {
           var rmap_f$98 =
             _f(function (accu$99, param$389) {
                  if (param$389) return __(rmap_f$98, [$(_(f$96, [param$389[0]]), accu$99), param$389[1]]);
                  return accu$99;
                });
           return __(rmap_f$98, [0, l$97]);
         });
    var iter$102 =
      _f(function (f$103, param$388) {
           if (param$388) { _(f$103, [param$388[0]]);
                            return __(iter$102, [f$103, param$388[1]]); }
           return 0;
         });
    var fold_left$106 =
      _f(function (f$107, accu$108, l$109) {
           if (l$109) return __(fold_left$106, [f$107, _(f$107, [accu$108, l$109[0]]), l$109[1]]);
           return accu$108;
         });
    var fold_right$112 =
      _f(function (f$113, l$114, accu$115) {
           if (l$114) return __(f$113, [l$114[0], _(fold_right$112, [f$113, l$114[1], accu$115])]);
           return accu$115;
         });
    var map2$118 =
      _f(function (f$119, l1$120, l2$121) {
           var $r34 = false;
           r$34: {
             if (!l1$120) { if (l2$121) { $r34 = true;
                                          break r$34; }
                            return 0; }
             if (!l2$121) { $r34 = true;
                            break r$34; }
             var r$126 = _(f$119, [l1$120[0], l2$121[0]]);
             return $(r$126, _(map2$118, [f$119, l1$120[1], l2$121[1]]));
           }
           if ($r34) return __(oc$Pervasives$[0], ["List.map2"]);
         });
    var rev_map2$127 =
      _f(function (f$128, l1$129, l2$130) {
           var rmap2_f$131 =
             _f(function (accu$132, l1$133, l2$134) {
                  var $r31 = false;
                  r$31: {
                    if (!l1$133) { if (l2$134) { $r31 = true;
                                                 break r$31; }
                                   return accu$132; }
                    if (!l2$134) { $r31 = true;
                                   break r$31; }
                    return __(rmap2_f$131, [$(_(f$128, [l1$133[0], l2$134[0]]), accu$132), l1$133[1], l2$134[1]]);
                  }
                  if ($r31) return __(oc$Pervasives$[0], ["List.rev_map2"]);
                });
           return __(rmap2_f$131, [0, l1$129, l2$130]);
         });
    var iter2$139 =
      _f(function (f$140, l1$141, l2$142) {
           var $r30 = false;
           r$30: {
             if (!l1$141) { if (l2$142) { $r30 = true;
                                          break r$30; }
                            return 0; }
             if (!l2$142) { $r30 = true;
                            break r$30; }
             _(f$140, [l1$141[0], l2$142[0]]);
             return __(iter2$139, [f$140, l1$141[1], l2$142[1]]);
           }
           if ($r30) return __(oc$Pervasives$[0], ["List.iter2"]);
         });
    var fold_left2$147 =
      _f(function (f$148, accu$149, l1$150, l2$151) {
           var $r29 = false;
           r$29: {
             if (!l1$150) { if (l2$151) { $r29 = true;
                                          break r$29; }
                            return accu$149; }
             if (!l2$151) { $r29 = true;
                            break r$29; }
             return __(fold_left2$147, [f$148, _(f$148, [accu$149, l1$150[0], l2$151[0]]), l1$150[1], l2$151[1]]);
           }
           if ($r29) return __(oc$Pervasives$[0], ["List.fold_left2"]);
         });
    var fold_right2$156 =
      _f(function (f$157, l1$158, l2$159, accu$160) {
           var $r28 = false;
           r$28: {
             if (!l1$158) { if (l2$159) { $r28 = true;
                                          break r$28; }
                            return accu$160; }
             if (!l2$159) { $r28 = true;
                            break r$28; }
             return __(f$157, [l1$158[0], l2$159[0], _(fold_right2$156, [f$157, l1$158[1], l2$159[1], accu$160])]);
           }
           if ($r28) return __(oc$Pervasives$[0], ["List.fold_right2"]);
         });
    var for_all$165 =
      _f(function (p$166, param$377) {
           if (param$377) return _(p$166, [param$377[0]]) && _(for_all$165, [p$166, param$377[1]]);
           return 1;
         });
    var exists$169 =
      _f(function (p$170, param$376) {
           if (param$376) return _(p$170, [param$376[0]]) || _(exists$169, [p$170, param$376[1]]);
           return 0;
         });
    var for_all2$173 =
      _f(function (p$174, l1$175, l2$176) {
           var $r27 = false;
           r$27: {
             if (!l1$175) { if (l2$176) { $r27 = true;
                                          break r$27; }
                            return 1; }
             if (!l2$176) { $r27 = true;
                            break r$27; }
             return _(p$174, [l1$175[0], l2$176[0]]) && _(for_all2$173, [p$174, l1$175[1], l2$176[1]]);
           }
           if ($r27) return __(oc$Pervasives$[0], ["List.for_all2"]);
         });
    var exists2$181 =
      _f(function (p$182, l1$183, l2$184) {
           var $r26 = false;
           r$26: {
             if (!l1$183) { if (l2$184) { $r26 = true;
                                          break r$26; }
                            return 0; }
             if (!l2$184) { $r26 = true;
                            break r$26; }
             return _(p$182, [l1$183[0], l2$184[0]]) || _(exists2$181, [p$182, l1$183[1], l2$184[1]]);
           }
           if ($r26) return __(oc$Pervasives$[0], ["List.exists2"]);
         });
    var mem$189 =
      _f(function (x$190, param$371) {
           if (param$371) return caml_compare(param$371[0], x$190) === 0 || _(mem$189, [x$190, param$371[1]]);
           return 0;
         });
    var memq$193 =
      _f(function (x$194, param$370) {
           if (param$370) return param$370[0] === x$194 || _(memq$193, [x$194, param$370[1]]);
           return 0;
         });
    var assoc$197 =
      _f(function (x$198, param$368) {
           if (param$368)
           {
             var match$369 = param$368[0];
             if (caml_compare(match$369[0], x$198) === 0) return match$369[1];
             return __(assoc$197, [x$198, param$368[1]]);
           }
           throw $(Not_found$20g);
         });
    var assq$202 =
      _f(function (x$203, param$366) {
           if (param$366)
           {
             var match$367 = param$366[0];
             if (match$367[0] === x$203) return match$367[1];
             return __(assq$202, [x$203, param$366[1]]);
           }
           throw $(Not_found$20g);
         });
    var mem_assoc$207 =
      _f(function (x$208, param$364) {
           if (param$364) return caml_compare(param$364[0][0], x$208) === 0 || _(mem_assoc$207, [x$208, param$364[1]]);
           return 0;
         });
    var mem_assq$212 =
      _f(function (x$213, param$362) {
           if (param$362) return param$362[0][0] === x$213 || _(mem_assq$212, [x$213, param$362[1]]);
           return 0;
         });
    var remove_assoc$217 =
      _f(function (x$218, param$361) {
           if (param$361)
           {
             var l$222 = param$361[1];
             var pair$221 = param$361[0];
             if (caml_compare(pair$221[0], x$218) === 0) return l$222;
             return $(pair$221, _(remove_assoc$217, [x$218, l$222]));
           }
           return 0;
         });
    var remove_assq$223 =
      _f(function (x$224, param$360) {
           if (param$360)
           {
             var l$228 = param$360[1];
             var pair$227 = param$360[0];
             if (pair$227[0] === x$224) return l$228;
             return $(pair$227, _(remove_assq$223, [x$224, l$228]));
           }
           return 0;
         });
    var find$229 =
      _f(function (p$230, param$359) {
           if (param$359)
           {
             var x$231 = param$359[0];
             if (_(p$230, [x$231])) return x$231;
             return __(find$229, [p$230, param$359[1]]);
           }
           throw $(Not_found$20g);
         });
    var find_all$233 =
      _f(function (p$234) {
           var find$235 =
             _f(function (accu$236, param$358) {
                  if (param$358)
                  {
                    var l$238 = param$358[1];
                    var x$237 = param$358[0];
                    if (_(p$234, [x$237])) return __(find$235, [$(x$237, accu$236), l$238]);
                    return __(find$235, [accu$236, l$238]);
                  }
                  return __(rev$84, [accu$236]);
                });
           return __(find$235, [0]);
         });
    var partition$240 =
      _f(function (p$241, l$242) {
           var part$243 =
             _f(function (yes$244, no$245, param$357) {
                  if (param$357)
                  {
                    var l$247 = param$357[1];
                    var x$246 = param$357[0];
                    if (_(p$241, [x$246])) return __(part$243, [$(x$246, yes$244), no$245, l$247]);
                    return __(part$243, [yes$244, $(x$246, no$245), l$247]);
                  }
                  return $(_(rev$84, [yes$244]), _(rev$84, [no$245]));
                });
           return __(part$243, [0, 0, l$242]);
         });
    var split$248 =
      _f(function (param$354) {
           if (param$354)
           {
             var match$356 = param$354[0];
             var match$355 = _(split$248, [param$354[1]]);
             return $($(match$356[0], match$355[0]), $(match$356[1], match$355[1]));
           }
           return $(0, 0);
         });
    var combine$254 =
      _f(function (l1$255, l2$256) {
           var $r21 = false;
           r$21: {
             if (!l1$255) { if (l2$256) { $r21 = true;
                                          break r$21; }
                            return 0; }
             if (!l2$256) { $r21 = true;
                            break r$21; }
             return $($(l1$255[0], l2$256[0]), _(combine$254, [l1$255[1], l2$256[1]]));
           }
           if ($r21) return __(oc$Pervasives$[0], ["List.combine"]);
         });
    var merge$261 =
      _f(function (cmp$262, l1$263, l2$264) {
           if (!l1$263) return l2$264;
           if (l2$264)
           {
             var h2$269 = l2$264[0];
             var h1$267 = l1$263[0];
             if (_(cmp$262, [h1$267, h2$269]) <= 0) return $(h1$267, _(merge$261, [cmp$262, l1$263[1], l2$264]));
             return $(h2$269, _(merge$261, [cmp$262, l1$263, l2$264[1]]));
           }
           return l1$263;
         });
    var chop$271 =
      _f(function (k$272, l$273) {
           if (k$272 === 0) return l$273;
           if (l$273) return __(chop$271, [k$272 - 1, l$273[1]]);
           throw $(Assert_failure$26g, $("ocaml/stdlib/list.ml", 213, 11));
         });
    var stable_sort$276 =
      _f(function (cmp$277, l$278) {
           var rev_merge$279 =
             _f(function (l1$280, l2$281, accu$282) {
                  if (!l1$280) return __(rev_append$79, [l2$281, accu$282]);
                  if (l2$281)
                  {
                    var h2$287 = l2$281[0];
                    var h1$285 = l1$280[0];
                    if (_(cmp$277, [h1$285, h2$287]) <= 0) return __(rev_merge$279, [l1$280[1], l2$281, $(h1$285, accu$282)]);
                    return __(rev_merge$279, [l1$280, l2$281[1], $(h2$287, accu$282)]);
                  }
                  return __(rev_append$79, [l1$280, accu$282]);
                });
           var rev_merge_rev$289 =
             _f(function (l1$290, l2$291, accu$292) {
                  if (!l1$290) return __(rev_append$79, [l2$291, accu$292]);
                  if (l2$291)
                  {
                    var h2$297 = l2$291[0];
                    var h1$295 = l1$290[0];
                    if (_(cmp$277, [h1$295, h2$297]) > 0) return __(rev_merge_rev$289, [l1$290[1], l2$291, $(h1$295, accu$292)]);
                    return __(rev_merge_rev$289, [l1$290, l2$291[1], $(h2$297, accu$292)]);
                  }
                  return __(rev_append$79, [l1$290, accu$292]);
                });
           var sort$299 =
             _f(function (n$301, l$302) {
                  var $r9 = false;
                  r$9: {
                    if (!(n$301 !== 2))
                    {
                      if (!l$302) { $r9 = true;
                                    break r$9; }
                      var match$334 = l$302[1];
                      if (!match$334) { $r9 = true;
                                        break r$9; }
                      var x2$304 = match$334[0];
                      var x1$303 = l$302[0];
                      if (_(cmp$277, [x1$303, x2$304]) <= 0) return $(x1$303, $(x2$304, 0));
                      return $(x2$304, $(x1$303, 0));
                    }
                    if (n$301 !== 3) { $r9 = true;
                                       break r$9; }
                    if (!l$302) { $r9 = true;
                                  break r$9; }
                    var match$336 = l$302[1];
                    if (!match$336) { $r9 = true;
                                      break r$9; }
                    var match$337 = match$336[1];
                    if (!match$337) { $r9 = true;
                                      break r$9; }
                    var x3$307 = match$337[0];
                    var x2$306 = match$336[0];
                    var x1$305 = l$302[0];
                    if (!(_(cmp$277, [x1$305, x2$306]) <= 0))
                    {
                      if (_(cmp$277, [x1$305, x3$307]) <= 0) return $(x2$306, $(x1$305, $(x3$307, 0)));
                      if (_(cmp$277, [x2$306, x3$307]) <= 0) return $(x2$306, $(x3$307, $(x1$305, 0)));
                      return $(x3$307, $(x2$306, $(x1$305, 0)));
                    }
                    if (_(cmp$277, [x2$306, x3$307]) <= 0) return $(x1$305, $(x2$306, $(x3$307, 0)));
                    if (_(cmp$277, [x1$305, x3$307]) <= 0) return $(x1$305, $(x3$307, $(x2$306, 0)));
                    return $(x3$307, $(x1$305, $(x2$306, 0)));
                  }
                  if ($r9)
                  {
                    var n1$310 = n$301 >>> 1;
                    var n2$311 = n$301 - n1$310;
                    var l2$312 = _(chop$271, [n1$310, l$302]);
                    var s1$313 = _(rev_sort$300, [n1$310, l$302]);
                    var s2$314 = _(rev_sort$300, [n2$311, l2$312]);
                    return __(rev_merge_rev$289, [s1$313, s2$314, 0]);
                  }
                });
           var rev_sort$300 =
             _f(function (n$315, l$316) {
                  var $r15 = false;
                  r$15: {
                    if (!(n$315 !== 2))
                    {
                      if (!l$316) { $r15 = true;
                                    break r$15; }
                      var match$341 = l$316[1];
                      if (!match$341) { $r15 = true;
                                        break r$15; }
                      var x2$318 = match$341[0];
                      var x1$317 = l$316[0];
                      if (_(cmp$277, [x1$317, x2$318]) > 0) return $(x1$317, $(x2$318, 0));
                      return $(x2$318, $(x1$317, 0));
                    }
                    if (n$315 !== 3) { $r15 = true;
                                       break r$15; }
                    if (!l$316) { $r15 = true;
                                  break r$15; }
                    var match$343 = l$316[1];
                    if (!match$343) { $r15 = true;
                                      break r$15; }
                    var match$344 = match$343[1];
                    if (!match$344) { $r15 = true;
                                      break r$15; }
                    var x3$321 = match$344[0];
                    var x2$320 = match$343[0];
                    var x1$319 = l$316[0];
                    if (!(_(cmp$277, [x1$319, x2$320]) > 0))
                    {
                      if (_(cmp$277, [x1$319, x3$321]) > 0) return $(x2$320, $(x1$319, $(x3$321, 0)));
                      if (_(cmp$277, [x2$320, x3$321]) > 0) return $(x2$320, $(x3$321, $(x1$319, 0)));
                      return $(x3$321, $(x2$320, $(x1$319, 0)));
                    }
                    if (_(cmp$277, [x2$320, x3$321]) > 0) return $(x1$319, $(x2$320, $(x3$321, 0)));
                    if (_(cmp$277, [x1$319, x3$321]) > 0) return $(x1$319, $(x3$321, $(x2$320, 0)));
                    return $(x3$321, $(x1$319, $(x2$320, 0)));
                  }
                  if ($r15)
                  {
                    var n1$324 = n$315 >>> 1;
                    var n2$325 = n$315 - n1$324;
                    var l2$326 = _(chop$271, [n1$324, l$316]);
                    var s1$327 = _(sort$299, [n1$324, l$316]);
                    var s2$328 = _(sort$299, [n2$325, l2$326]);
                    return __(rev_merge$279, [s1$327, s2$328, 0]);
                  }
                });
           var len$329 = _(length$62, [l$278]);
           if (len$329 < 2) return l$278;
           return __(sort$299, [len$329, l$278]);
         });
    return $(length$62, hd$64, tl$67, nth$70, rev$84, append$78, rev_append$79, 
           flatten$86, flatten$86, iter$102, map$90, rev_map$95, fold_left$106, 
           fold_right$112, iter2$139, map2$118, rev_map2$127, fold_left2$147, 
           fold_right2$156, for_all$165, exists$169, for_all2$173, exists2$181, 
           mem$189, memq$193, find$229, find_all$233, find_all$233, partition$240, 
           assoc$197, assq$202, mem_assoc$207, mem_assq$212, remove_assoc$217, 
           remove_assq$223, split$248, combine$254, stable_sort$276, 
           stable_sort$276, stable_sort$276, merge$261);
  }();
var oc$Queue$ =
  function () {
    var Empty$58 = $("Queue.Empty");
    var create$75 = _f(function (param$136) { return $(0, 0); });
    var clear$76 = _f(function (q$77) { q$77[0] = 0;
                                        return q$77[1] = 0; });
    var add$78 =
      _f(function (x$79, q$80) {
           q$80[0] = q$80[0] + 1;
           if (q$80[0] === 1) { var cell$81 = $(x$79, cell$81);
                                cell$81[1] = cell$81;
                                return q$80[1] = cell$81; }
           var tail$82 = q$80[1];
           var head$83 = tail$82[1];
           var cell$84 = $(x$79, head$83);
           tail$82[1] = cell$84;
           return q$80[1] = cell$84;
         });
    var peek$86 = _f(function (q$87) { if (q$87[0] === 0) throw $(Empty$58);
                                       return q$87[1][1][0]; });
    var take$89 =
      _f(function (q$90) {
           if (q$90[0] === 0) throw $(Empty$58); else ;
           q$90[0] = q$90[0] - 1;
           var tail$91 = q$90[1];
           var head$92 = tail$91[1];
           if (head$92 === tail$91) q$90[1] = 0; else tail$91[1] = head$92[1];
           return head$92[0];
         });
    var copy$94 =
      _f(function (q$95) {
           if (q$95[0] === 0) return __(create$75, [0]);
           var tail$96 = q$95[1];
           var tail$27$97 = $(tail$96[0], tail$27$97);
           tail$27$97[1] = tail$27$97;
           var copy$98 =
             _f(function (cell$99) { if (cell$99 === tail$96) return tail$27$97;
                                     return $(cell$99[0], _(copy$98, [cell$99[1]])); });
           tail$27$97[1] = _(copy$98, [tail$96[1]]);
           return $(q$95[0], tail$27$97);
         });
    var is_empty$100 = _f(function (q$101) { return q$101[0] === 0; });
    var length$102 = _f(function (q$103) { return q$103[0]; });
    var iter$104 =
      _f(function (f$105, q$106) {
           if (q$106[0] > 0)
           {
             var tail$107 = q$106[1];
             var iter$108 =
               _f(function (cell$109) {
                    _(f$105, [cell$109[0]]);
                    if (cell$109 !== tail$107) return __(iter$108, [cell$109[1]]);
                    return 0;
                  });
             return __(iter$108, [tail$107[1]]);
           }
           return 0;
         });
    var fold$110 =
      _f(function (f$111, accu$112, q$113) {
           if (q$113[0] === 0) return accu$112;
           var tail$114 = q$113[1];
           var fold$115 =
             _f(function (accu$116, cell$117) {
                  var accu$118 = _(f$111, [accu$116, cell$117[0]]);
                  if (cell$117 === tail$114) return accu$118;
                  return __(fold$115, [accu$118, cell$117[1]]);
                });
           return __(fold$115, [accu$112, tail$114[1]]);
         });
    var transfer$119 =
      _f(function (q1$120, q2$121) {
           var length1$122 = q1$120[0];
           if (length1$122 > 0)
           {
             var tail1$123 = q1$120[1];
             _(clear$76, [q1$120]);
             if (q2$121[0] > 0)
             {
               var tail2$124 = q2$121[1];
               var head1$125 = tail1$123[1];
               var head2$126 = tail2$124[1];
               tail1$123[1] = head2$126;
               tail2$124[1] = head1$125;
             }
             else ;
             q2$121[0] = q2$121[0] + length1$122;
             return q2$121[1] = tail1$123;
           }
           return 0;
         });
    return $(Empty$58, create$75, add$78, add$78, take$89, take$89, peek$86, 
           peek$86, clear$76, copy$94, is_empty$100, length$102, iter$104, 
           fold$110, transfer$119);
  }();
var oc$Froc_timestamp$ =
  function () {
    var debug$58 = $(_f(function (param$116) { return 0; }));
    var set_debug$59 = _f(function (f$60) { return debug$58[0] = f$60; });
    var is_spliced_out$68 = _f(function (t$69) { return t$69[0] === -1; });
    var check$70 =
      _f(function (t$71) { if (_(is_spliced_out$68, [t$71])) throw $(Invalid_argument$18g, "spliced out timestamp");
                           return 0; });
    var next_id$72 =
      function () {
        var next_id$73 = $(1);
        return _f(function (param$115) { var id$74 = next_id$73[0];
                                         next_id$73[0]++;
                                         return id$74; });
      }();
    var init$75 =
      _f(function (param$110) {
           var s$76 = $(0, s$76, _f(function (prim$114) { ;
                                                          return 0; }));
           s$76[1] = s$76;
           return $(_(next_id$72, [0]), s$76, _f(function (prim$112) { ;
                                                                    return 0; }));
         });
    var add_after$77 =
      _f(function (t$78) {
           _(check$70, [t$78]);
           var t$27$79 = $(_(next_id$72, [0]), t$78[1], _f(function (prim$109) { ;
                                                                    return 0; }));
           t$78[1] = t$27$79;
           return t$27$79;
         });
    var set_cleanup$80 = _f(function (t$81, cleanup$82) { _(check$70, [t$81]);
                                                          return t$81[2] = cleanup$82; });
    var add_cleanup$83 =
      _f(function (t$84, cleanup$27$85) {
           _(check$70, [t$84]);
           var cleanup$86 = t$84[2];
           return t$84[2] = _f(function (param$107) { _(cleanup$86, [0]);
                                                      return __(cleanup$27$85, [0]); });
         });
    var splice_out$87 =
      _f(function (t1$88, t2$89) {
           _(check$70, [t1$88]);
           _(check$70, [t2$89]);
           var loop$90 =
             _f(function (t$91) {
                  var id$92 = t$91[0];
                  if (!(id$92 !== -1)) throw $(Assert_failure$26g, $("froc_timestamp.ml", 44, 14));
                  if (!(id$92 !== 0)) throw $(Invalid_argument$18g, "t1 >= t2");
                  if (id$92 === t2$89[0]) return 0;
                  t$91[0] = -1;
                  _(t$91[2], [0]);
                  t$91[2] = _f(function (prim$106) { ;
                                                     return 0; });
                  return __(loop$90, [t$91[1]]);
                });
           _(loop$90, [t1$88[1]]);
           return t1$88[1] = t2$89;
         });
    var compare$93 =
      _f(function (t1$94, t2$95) {
           var match$104 = t1$94[0];
           var match$105 = t2$95[0];
           if (match$104 === match$105) return 0;
           if (!(match$104 !== -1)) return -1;
           if (match$105 !== -1)
           {
             var loop$98 =
               _f(function (t$99) {
                    var id$100 = t$99[0];
                    if (!(id$100 !== -1)) throw $(Assert_failure$26g, $("froc_timestamp.ml", 67, 20));
                    if (!(id$100 !== 0)) return 1;
                    if (id$100 === t2$95[0]) return -1;
                    return __(loop$98, [t$99[1]]);
                  });
             return __(loop$98, [t1$94[1]]);
           }
           return 1;
         });
    return $(init$75, add_after$77, set_cleanup$80, add_cleanup$83, splice_out$87, is_spliced_out$68, compare$93, set_debug$59);
  }();
var oc$Froc_ddg$ =
  function () {
    var Dlist$88 =
      function () {
        var empty$71 = _f(function (param$651) { var t$72 = $(0, t$72, t$72);
                                                 t$72[1] = t$72;
                                                 t$72[2] = t$72;
                                                 return t$72; });
        var add_after$73 =
          _f(function (t$74, d$75) { var n$76 = $(d$75, t$74, t$74[2]);
                                     t$74[2][1] = n$76;
                                     t$74[2] = n$76;
                                     return n$76; });
        var add_before$77 =
          _f(function (t$78, d$79) { var n$80 = $(d$79, t$78[1], t$78);
                                     t$78[1][2] = n$80;
                                     t$78[1] = n$80;
                                     return n$80; });
        var remove$81 = _f(function (t$82) { t$82[2][1] = t$82[1];
                                             t$82[1][2] = t$82[2];
                                             t$82[2] = t$82;
                                             return t$82[1] = t$82; });
        var iter$83 =
          _f(function (f$84, d$85) {
               var loop$86 =
                 _f(function (t$87) { if (!(t$87 === d$85)) { _(f$84, [t$87[0]]);
                                                              return __(loop$86, [t$87[2]]); }
                                      return 0; });
               return __(loop$86, [d$85[2]]);
             });
        return $(empty$71, add_after$73, add_before$77, remove$81, iter$83);
      }();
    var TS$89 = oc$Froc_timestamp$;
    var debug$90 = $(_f(function (param$648) { return 0; }));
    var set_debug$91 = _f(function (f$92) { debug$90[0] = f$92;
                                            return __(TS$89[7], [f$92]); });
    var PQ$144 =
      function () {
        var empty$125 = _(Dlist$88[0], [0]);
        var is_empty$126 = _f(function (t$127) { return t$127[1] === t$127 && t$127[2] === t$127; });
        var add$128 =
          _f(function (elt$129, d$130) {
               var loop$131 =
                 _f(function (t$132) {
                      if (t$132 === d$130 || _(TS$89[6], [elt$129[1], t$132[0][1]]) === -1)
                      {
                        _(Dlist$88[2], [t$132, elt$129]);
                        return 0;
                      }
                      return __(loop$131, [t$132[2]]);
                    });
               _(loop$131, [d$130[2]]);
               return d$130;
             });
        var find_min$133 = _f(function (t$134) { if (_(is_empty$126, [t$134])) throw $(Not_found$20g);
                                                 return t$134[2][0]; });
        var remove_min$135 =
          _f(function (t$136) { if (_(is_empty$126, [t$136])) ; else _(Dlist$88[3], [t$136[2]]);
                                return t$136; });
        return $(empty$125, is_empty$126, add$128, find_min$133, remove_min$135);
      }();
    var now$145 = $(_(TS$89[0], [0]));
    var pq$146 = $(PQ$144[0]);
    var init$147 = _f(function (param$647) { now$145[0] = _(TS$89[0], [0]);
                                             return pq$146[0] = PQ$144[0]; });
    var next_id$148 =
      function () {
        var next_id$149 = $(1);
        return _f(function (param$646) { var id$150 = next_id$149[0];
                                         next_id$149[0]++;
                                         return id$150; });
      }();
    var tick$151 = _f(function (param$645) { now$145[0] = _(TS$89[1], [now$145[0]]);
                                             return now$145[0]; });
    var Unset$152 = $("Froc_ddg.Unset");
    var make$153 =
      _f(function ($2Aopt$2A$154, $2Aopt$2A$157, $2Aopt$2A$162, param$642) {
           var event$155 = $2Aopt$2A$154 ? $2Aopt$2A$154[0] : 0;
           var eq$158 =
             $2Aopt$2A$157 ? $2Aopt$2A$157[0] :
             _f(function (v1$160, v2$161) { try { return caml_compare(v1$160, v2$161) === 0; } catch (exn$644) { return 0; } });
           var result$163 = $2Aopt$2A$162 ? $2Aopt$2A$162[0] : $1($(Unset$152));
           return $(_(next_id$148, [0]), event$155, eq$158, result$163, _(Dlist$88[0], [0]));
         });
    var return$165 = _f(function (eq$166, v$167) { return __(make$153, [0, eq$166, $($(v$167)), 0]); });
    var fail$168 = _f(function (e$169) { return __(make$153, [0, 0, $($1(e$169)), 0]); });
    var handle_exn$170 = $(_f(function (e$171) { throw e$171; }));
    var write_result$172 =
      _f(function (t$173, r$174) {
           if (t$173[1])
           return __(Dlist$88[4],
                  [_f(function (f$175) {
                        try { return _(f$175, [r$174]); } catch (e$176) { return __(handle_exn$170[0], [e$176]); }
                      }),
                  t$173[4]]);
           var eq$177 =
             function () {
               var match$640 = t$173[3];
               var $r134 = false;
               r$134: switch ($t(match$640))
                      {
                      case 0:
                        switch ($t(r$174))
                        {
                        case 0: return _(t$173[2], [match$640[0], r$174[0]]);
                        default: $r134 = true;
                                 break r$134;
                        }
                        break;
                      case 1:
                        switch ($t(r$174)) { case 1: return match$640[0] === r$174[0]; default: $r134 = true;
                                                                    break r$134; }
                        break;
                      default: return null;
                      }
               if ($r134) return 0;
             }();
           if (!eq$177)
           {
             t$173[3] = r$174;
             return __(Dlist$88[4],
                    [_f(function (f$182) {
                          try { return _(f$182, [r$174]); } catch (e$183) { return __(handle_exn$170[0], [e$183]); }
                        }),
                    t$173[4]]);
           }
           return 0;
         });
    var write$184 = _f(function (t$185, v$186) { return __(write_result$172, [t$185, $(v$186)]); });
    var write_exn$187 = _f(function (t$188, e$189) { return __(write_result$172, [t$188, $1(e$189)]); });
    var read_result$190 = _f(function (t$191) { return t$191[3]; });
    var read$192 =
      _f(function (t$193) {
           var match$639 = t$193[3];
           switch ($t(match$639)) { case 0: return match$639[0]; case 1: throw match$639[0]; default: return null; }
         });
    var add_dep$196 =
      _f(function (ts$197, t$198, dep$199) {
           var dl$200 = _(Dlist$88[1], [t$198[4], dep$199]);
           var cancel$201 = _f(function (param$638) { return __(Dlist$88[3], [dl$200]); });
           return __(TS$89[3], [ts$197, cancel$201]);
         });
    var enqueue$202 = _f(function (e$203, param$637) { return pq$146[0] = _(PQ$144[2], [e$203, pq$146[0]]); });
    var add_reader$204 =
      _f(function (t$205, read$206) {
           var start$207 = _(tick$151, [0]);
           _(read$206, [0]);
           var r$208 = $(read$206, start$207, _(tick$151, [0]));
           return __(add_dep$196, [start$207, t$205, _(enqueue$202, [r$208])]);
         });
    var notify$209 = _f(function (t$210, f$211) { return __(add_dep$196, [_(tick$151, [0]), t$210, f$211]); });
    var cleanup$212 = _f(function (f$213) { return __(TS$89[2], [_(tick$151, [0]), f$213]); });
    var connect$214 =
      _f(function (t$215, t$27$216) {
           var f$217 = _f(function (param$635) { return __(write_result$172, [t$215, t$27$216[3]]); });
           _(f$217, [0]);
           return __(notify$209, [t$27$216, f$217]);
         });
    var never$218 = _f(function (param$633, param$634) { return 0; });
    var bind_gen$219 =
      _f(function (assign$220, eq$221, f$222, t$223) {
           var res$224 = _(make$153, [0, eq$221, 0, 0]);
           _(add_reader$204,
           [t$223,
           _f(function (param$631) {
                var match$632 = t$223[3];
                switch ($t(match$632))
                {
                case 0:
                  try {
                    return _(assign$220, [res$224, _(f$222, [match$632[0]])]);
                  } catch (e$227) {
                    return __(write_exn$187, [res$224, e$227]);
                  }
                  break;
                case 1: return __(write_exn$187, [res$224, match$632[0]]);
                default: return null;
                }
              })]);
           return res$224;
         });
    var bind$228 = _f(function (t$229, f$230) { return __(bind_gen$219, [connect$214, $(never$218), f$230, t$229]); });
    var lift$232 = _f(function (eq$233, f$234) { return __(bind_gen$219, [write$184, eq$233, f$234]); });
    var blift$235 = _f(function (t$236, eq$237, f$238) { return __(lift$232, [eq$237, f$238, t$236]); });
    var try_bind_gen$239 =
      _f(function (assign$240, f$241, eq$242, succ$243, err$244) {
           var t$245 = function () { try { return _(f$241, [0]); } catch (e$246) { return _(fail$168, [e$246]); } }();
           var res$247 = _(make$153, [0, eq$242, 0, 0]);
           _(add_reader$204,
           [t$245,
           _f(function (param$629) {
                try {
                  return _(assign$240,
                         [res$247,
                         function () {
                           var match$630 = t$245[3];
                           switch ($t(match$630))
                           {
                           case 0: return _(succ$243, [match$630[0]]);
                           case 1: return _(err$244, [match$630[0]]);
                           default: return null;
                           }
                         }()]);
                } catch (e$250) {
                  return __(write_exn$187, [res$247, e$250]);
                }
              })]);
           return res$247;
         });
    var try_bind$251 =
      _f(function (f$252, succ$253, err$254) {
           return __(try_bind_gen$239, [connect$214, f$252, $(never$218), succ$253, err$254]);
         });
    var try_bind_lift$255 =
      _f(function (f$256, eq$257, succ$258, err$259) {
           return __(try_bind_gen$239, [write$184, f$256, eq$257, succ$258, err$259]);
         });
    var catch_gen$260 =
      _f(function (assign$261, f$262, eq$263, err$264) {
           var t$265 = function () { try { return _(f$262, [0]); } catch (e$266) { return _(fail$168, [e$266]); } }();
           var res$267 = _(make$153, [0, eq$263, 0, 0]);
           _(add_reader$204,
           [t$265,
           _f(function (param$627) {
                var match$628 = t$265[3];
                switch ($t(match$628))
                {
                case 0: return __(write_result$172, [res$267, t$265[3]]);
                case 1:
                  try {
                    return _(assign$261, [res$267, _(err$264, [match$628[0]])]);
                  } catch (e$270) {
                    return __(write_exn$187, [res$267, e$270]);
                  }
                  break;
                default: return null;
                }
              })]);
           return res$267;
         });
    var catch$271 = _f(function (f$272, err$273) { return __(catch_gen$260, [connect$214, f$272, $(never$218), err$273]); });
    var catch_lift$274 = _f(function (f$275, eq$276, err$277) { return __(catch_gen$260, [write$184, f$275, eq$276, err$277]); });
    var propagate$278 =
      _f(function (param$625) {
           var prop$279 =
             _f(function (param$626) {
                  if (!_(PQ$144[1], [pq$146[0]]))
                  {
                    var r$280 = _(PQ$144[3], [pq$146[0]]);
                    pq$146[0] = _(PQ$144[4], [pq$146[0]]);
                    if (!_(TS$89[5], [r$280[1]]))
                    {
                      _(TS$89[4], [r$280[1], r$280[2]]);
                      now$145[0] = r$280[1];
                      _(r$280[0], [0]);
                    }
                    else ;
                    return __(prop$279, [0]);
                  }
                  return 0;
                });
           var now$27$281 = now$145[0];
           _(prop$279, [0]);
           return now$145[0] = now$27$281;
         });
    var set_exn_handler$282 = _f(function (h$283) { return handle_exn$170[0] = h$283; });
    var bind2_gen$284 =
      _f(function (assign$285, eq$286, f$287, t1$288, t2$289) {
           var res$290 = _(make$153, [0, eq$286, 0, 0]);
           var read$291 =
             _f(function (param$620) {
                  var match$623 = t1$288[3];
                  var match$624 = t2$289[3];
                  var $r87_0 = null;
                  var $r87 = false;
                  r$87: switch ($t(match$623))
                        {
                        case 0:
                          switch ($t(match$624))
                          {
                          case 0:
                            try {
                              return _(assign$285, [res$290, _(f$287, [match$623[0], match$624[0]])]);
                            } catch (e$296) {
                              return __(write_exn$187, [res$290, e$296]);
                            }
                            break;
                          default: $r87_0 = match$624[0];
                                   $r87 = true;
                                   break r$87;
                          }
                          break;
                        case 1: $r87_0 = match$623[0];
                                $r87 = true;
                                break r$87;
                        default: return null;
                        }
                  if ($r87) { var e$292 = $r87_0;
                              return __(write_exn$187, [res$290, e$292]); }
                });
           var start$297 = _(tick$151, [0]);
           _(read$291, [0]);
           var r$298 = $(read$291, start$297, _(tick$151, [0]));
           _(add_dep$196, [start$297, t1$288, _(enqueue$202, [r$298])]);
           _(add_dep$196, [start$297, t2$289, _(enqueue$202, [r$298])]);
           return res$290;
         });
    var bind2$299 =
      _f(function (t1$300, t2$301, f$302) { return __(bind2_gen$284, [connect$214, $(never$218), f$302, t1$300, t2$301]); });
    var lift2$303 = _f(function (eq$304, f$305) { return __(bind2_gen$284, [write$184, eq$304, f$305]); });
    var blift2$306 = _f(function (t1$307, t2$308, eq$309, f$310) { return __(lift2$303, [eq$309, f$310, t1$307, t2$308]); });
    var bind3_gen$311 =
      _f(function (assign$312, eq$313, f$314, t1$315, t2$316, t3$317) {
           var res$318 = _(make$153, [0, eq$313, 0, 0]);
           var read$319 =
             _f(function (param$612) {
                  var match$616 = t1$315[3];
                  var match$617 = t2$316[3];
                  var match$618 = t3$317[3];
                  var $r75_0 = null;
                  var $r75 = false;
                  r$75: switch ($t(match$616))
                        {
                        case 0:
                          switch ($t(match$617))
                          {
                          case 0:
                            switch ($t(match$618))
                            {
                            case 0:
                              try {
                                return _(assign$312, [res$318, _(f$314, [match$616[0], match$617[0], match$618[0]])]);
                              } catch (e$326) {
                                return __(write_exn$187, [res$318, e$326]);
                              }
                              break;
                            default: $r75_0 = match$618[0];
                                     $r75 = true;
                                     break r$75;
                            }
                            break;
                          default: $r75_0 = match$617[0];
                                   $r75 = true;
                                   break r$75;
                          }
                          break;
                        case 1: $r75_0 = match$616[0];
                                $r75 = true;
                                break r$75;
                        default: return null;
                        }
                  if ($r75) { var e$320 = $r75_0;
                              return __(write_exn$187, [res$318, e$320]); }
                });
           var start$327 = _(tick$151, [0]);
           _(read$319, [0]);
           var r$328 = $(read$319, start$327, _(tick$151, [0]));
           _(add_dep$196, [start$327, t1$315, _(enqueue$202, [r$328])]);
           _(add_dep$196, [start$327, t2$316, _(enqueue$202, [r$328])]);
           _(add_dep$196, [start$327, t3$317, _(enqueue$202, [r$328])]);
           return res$318;
         });
    var bind3$329 =
      _f(function (t1$330, t2$331, t3$332, f$333) {
           return __(bind3_gen$311, [connect$214, $(never$218), f$333, t1$330, t2$331, t3$332]);
         });
    var lift3$334 = _f(function (eq$335, f$336) { return __(bind3_gen$311, [write$184, eq$335, f$336]); });
    var blift3$337 =
      _f(function (t1$338, t2$339, t3$340, eq$341, f$342) { return __(lift3$334, [eq$341, f$342, t1$338, t2$339, t3$340]); });
    var bind4_gen$343 =
      _f(function (assign$344, eq$345, f$346, t1$347, t2$348, t3$349, t4$350) {
           var res$351 = _(make$153, [0, eq$345, 0, 0]);
           var read$352 =
             _f(function (param$602) {
                  var match$607 = t1$347[3];
                  var match$608 = t2$348[3];
                  var match$609 = t3$349[3];
                  var match$610 = t4$350[3];
                  var $r62_0 = null;
                  var $r62 = false;
                  r$62: switch ($t(match$607))
                        {
                        case 0:
                          switch ($t(match$608))
                          {
                          case 0:
                            switch ($t(match$609))
                            {
                            case 0:
                              switch ($t(match$610))
                              {
                              case 0:
                                try {
                                  return _(assign$344,
                                         [res$351, _(f$346, [match$607[0], match$608[0], match$609[0], match$610[0]])]);
                                } catch (e$361) {
                                  return __(write_exn$187, [res$351, e$361]);
                                }
                                break;
                              default: $r62_0 = match$610[0];
                                       $r62 = true;
                                       break r$62;
                              }
                              break;
                            default: $r62_0 = match$609[0];
                                     $r62 = true;
                                     break r$62;
                            }
                            break;
                          default: $r62_0 = match$608[0];
                                   $r62 = true;
                                   break r$62;
                          }
                          break;
                        case 1: $r62_0 = match$607[0];
                                $r62 = true;
                                break r$62;
                        default: return null;
                        }
                  if ($r62) { var e$353 = $r62_0;
                              return __(write_exn$187, [res$351, e$353]); }
                });
           var start$362 = _(tick$151, [0]);
           _(read$352, [0]);
           var r$363 = $(read$352, start$362, _(tick$151, [0]));
           _(add_dep$196, [start$362, t1$347, _(enqueue$202, [r$363])]);
           _(add_dep$196, [start$362, t2$348, _(enqueue$202, [r$363])]);
           _(add_dep$196, [start$362, t3$349, _(enqueue$202, [r$363])]);
           _(add_dep$196, [start$362, t4$350, _(enqueue$202, [r$363])]);
           return res$351;
         });
    var bind4$364 =
      _f(function (t1$365, t2$366, t3$367, t4$368, f$369) {
           return __(bind4_gen$343, [connect$214, $(never$218), f$369, t1$365, t2$366, t3$367, t4$368]);
         });
    var lift4$370 = _f(function (eq$371, f$372) { return __(bind4_gen$343, [write$184, eq$371, f$372]); });
    var blift4$373 =
      _f(function (t1$374, t2$375, t3$376, t4$377, eq$378, f$379) {
           return __(lift4$370, [eq$378, f$379, t1$374, t2$375, t3$376, t4$377]);
         });
    var bind5_gen$380 =
      _f(function (assign$381, eq$382, f$383, t1$384, t2$385, t3$386, t4$387, t5$388) {
           var res$389 = _(make$153, [0, eq$382, 0, 0]);
           var read$390 =
             _f(function (param$590) {
                  var match$596 = t1$384[3];
                  var match$597 = t2$385[3];
                  var match$598 = t3$386[3];
                  var match$599 = t4$387[3];
                  var match$600 = t5$388[3];
                  var $r48_0 = null;
                  var $r48 = false;
                  r$48: switch ($t(match$596))
                        {
                        case 0:
                          switch ($t(match$597))
                          {
                          case 0:
                            switch ($t(match$598))
                            {
                            case 0:
                              switch ($t(match$599))
                              {
                              case 0:
                                switch ($t(match$600))
                                {
                                case 0:
                                  try {
                                    return _(assign$381,
                                           [res$389,
                                           _(f$383, [match$596[0], match$597[0], match$598[0], match$599[0], match$600[0]])]);
                                  } catch (e$401) {
                                    return __(write_exn$187, [res$389, e$401]);
                                  }
                                  break;
                                default: $r48_0 = match$600[0];
                                         $r48 = true;
                                         break r$48;
                                }
                                break;
                              default: $r48_0 = match$599[0];
                                       $r48 = true;
                                       break r$48;
                              }
                              break;
                            default: $r48_0 = match$598[0];
                                     $r48 = true;
                                     break r$48;
                            }
                            break;
                          default: $r48_0 = match$597[0];
                                   $r48 = true;
                                   break r$48;
                          }
                          break;
                        case 1: $r48_0 = match$596[0];
                                $r48 = true;
                                break r$48;
                        default: return null;
                        }
                  if ($r48) { var e$391 = $r48_0;
                              return __(write_exn$187, [res$389, e$391]); }
                });
           var start$402 = _(tick$151, [0]);
           _(read$390, [0]);
           var r$403 = $(read$390, start$402, _(tick$151, [0]));
           _(add_dep$196, [start$402, t1$384, _(enqueue$202, [r$403])]);
           _(add_dep$196, [start$402, t2$385, _(enqueue$202, [r$403])]);
           _(add_dep$196, [start$402, t3$386, _(enqueue$202, [r$403])]);
           _(add_dep$196, [start$402, t4$387, _(enqueue$202, [r$403])]);
           _(add_dep$196, [start$402, t5$388, _(enqueue$202, [r$403])]);
           return res$389;
         });
    var bind5$404 =
      _f(function (t1$405, t2$406, t3$407, t4$408, t5$409, f$410) {
           return __(bind5_gen$380, [connect$214, $(never$218), f$410, t1$405, t2$406, t3$407, t4$408, t5$409]);
         });
    var lift5$411 = _f(function (eq$412, f$413) { return __(bind5_gen$380, [write$184, eq$412, f$413]); });
    var blift5$414 =
      _f(function (t1$415, t2$416, t3$417, t4$418, t5$419, eq$420, f$421) {
           return __(lift5$411, [eq$420, f$421, t1$415, t2$416, t3$417, t4$418, t5$419]);
         });
    var bind6_gen$422 =
      _f(function (assign$423, eq$424, f$425, t1$426, t2$427, t3$428, t4$429, t5$430, t6$431) {
           var res$432 = _(make$153, [0, eq$424, 0, 0]);
           var read$433 =
             _f(function (param$576) {
                  var match$583 = t1$426[3];
                  var match$584 = t2$427[3];
                  var match$585 = t3$428[3];
                  var match$586 = t4$429[3];
                  var match$587 = t5$430[3];
                  var match$588 = t6$431[3];
                  var $r33_0 = null;
                  var $r33 = false;
                  r$33: switch ($t(match$583))
                        {
                        case 0:
                          switch ($t(match$584))
                          {
                          case 0:
                            switch ($t(match$585))
                            {
                            case 0:
                              switch ($t(match$586))
                              {
                              case 0:
                                switch ($t(match$587))
                                {
                                case 0:
                                  switch ($t(match$588))
                                  {
                                  case 0:
                                    try {
                                      return _(assign$423,
                                             [res$432,
                                             _(f$425,
                                             [match$583[0], match$584[0], match$585[0], match$586[0], match$587[0], match$588[0]])]);
                                    } catch (e$446) {
                                      return __(write_exn$187, [res$432, e$446]);
                                    }
                                    break;
                                  default: $r33_0 = match$588[0];
                                           $r33 = true;
                                           break r$33;
                                  }
                                  break;
                                default: $r33_0 = match$587[0];
                                         $r33 = true;
                                         break r$33;
                                }
                                break;
                              default: $r33_0 = match$586[0];
                                       $r33 = true;
                                       break r$33;
                              }
                              break;
                            default: $r33_0 = match$585[0];
                                     $r33 = true;
                                     break r$33;
                            }
                            break;
                          default: $r33_0 = match$584[0];
                                   $r33 = true;
                                   break r$33;
                          }
                          break;
                        case 1: $r33_0 = match$583[0];
                                $r33 = true;
                                break r$33;
                        default: return null;
                        }
                  if ($r33) { var e$434 = $r33_0;
                              return __(write_exn$187, [res$432, e$434]); }
                });
           var start$447 = _(tick$151, [0]);
           _(read$433, [0]);
           var r$448 = $(read$433, start$447, _(tick$151, [0]));
           _(add_dep$196, [start$447, t1$426, _(enqueue$202, [r$448])]);
           _(add_dep$196, [start$447, t2$427, _(enqueue$202, [r$448])]);
           _(add_dep$196, [start$447, t3$428, _(enqueue$202, [r$448])]);
           _(add_dep$196, [start$447, t4$429, _(enqueue$202, [r$448])]);
           _(add_dep$196, [start$447, t5$430, _(enqueue$202, [r$448])]);
           _(add_dep$196, [start$447, t6$431, _(enqueue$202, [r$448])]);
           return res$432;
         });
    var bind6$449 =
      _f(function (t1$450, t2$451, t3$452, t4$453, t5$454, t6$455, f$456) {
           return __(bind6_gen$422, [connect$214, $(never$218), f$456, t1$450, t2$451, t3$452, t4$453, t5$454, t6$455]);
         });
    var lift6$457 = _f(function (eq$458, f$459) { return __(bind6_gen$422, [write$184, eq$458, f$459]); });
    var blift6$460 =
      _f(function (t1$461, t2$462, t3$463, t4$464, t5$465, t6$466, eq$467, f$468) {
           return __(lift6$457, [eq$467, f$468, t1$461, t2$462, t3$463, t4$464, t5$465, t6$466]);
         });
    var bind7_gen$469 =
      _f(function (assign$470, eq$471, f$472, t1$473, t2$474, t3$475, t4$476, t5$477, t6$478, t7$479) {
           var res$480 = _(make$153, [0, eq$471, 0, 0]);
           var read$481 =
             _f(function (param$560) {
                  var match$568 = t1$473[3];
                  var match$569 = t2$474[3];
                  var match$570 = t3$475[3];
                  var match$571 = t4$476[3];
                  var match$572 = t5$477[3];
                  var match$573 = t6$478[3];
                  var match$574 = t7$479[3];
                  var $r17_0 = null;
                  var $r17 = false;
                  r$17: switch ($t(match$568))
                        {
                        case 0:
                          switch ($t(match$569))
                          {
                          case 0:
                            switch ($t(match$570))
                            {
                            case 0:
                              switch ($t(match$571))
                              {
                              case 0:
                                switch ($t(match$572))
                                {
                                case 0:
                                  switch ($t(match$573))
                                  {
                                  case 0:
                                    switch ($t(match$574))
                                    {
                                    case 0:
                                      try {
                                        return _(assign$470,
                                               [res$480,
                                               _(f$472,
                                               [match$568[0], match$569[0], 
                                               match$570[0], match$571[0], 
                                               match$572[0], match$573[0], 
                                               match$574[0]])]);
                                      } catch (e$496) {
                                        return __(write_exn$187, [res$480, e$496]);
                                      }
                                      break;
                                    default: $r17_0 = match$574[0];
                                             $r17 = true;
                                             break r$17;
                                    }
                                    break;
                                  default: $r17_0 = match$573[0];
                                           $r17 = true;
                                           break r$17;
                                  }
                                  break;
                                default: $r17_0 = match$572[0];
                                         $r17 = true;
                                         break r$17;
                                }
                                break;
                              default: $r17_0 = match$571[0];
                                       $r17 = true;
                                       break r$17;
                              }
                              break;
                            default: $r17_0 = match$570[0];
                                     $r17 = true;
                                     break r$17;
                            }
                            break;
                          default: $r17_0 = match$569[0];
                                   $r17 = true;
                                   break r$17;
                          }
                          break;
                        case 1: $r17_0 = match$568[0];
                                $r17 = true;
                                break r$17;
                        default: return null;
                        }
                  if ($r17) { var e$482 = $r17_0;
                              return __(write_exn$187, [res$480, e$482]); }
                });
           var start$497 = _(tick$151, [0]);
           _(read$481, [0]);
           var r$498 = $(read$481, start$497, _(tick$151, [0]));
           _(add_dep$196, [start$497, t1$473, _(enqueue$202, [r$498])]);
           _(add_dep$196, [start$497, t2$474, _(enqueue$202, [r$498])]);
           _(add_dep$196, [start$497, t3$475, _(enqueue$202, [r$498])]);
           _(add_dep$196, [start$497, t4$476, _(enqueue$202, [r$498])]);
           _(add_dep$196, [start$497, t5$477, _(enqueue$202, [r$498])]);
           _(add_dep$196, [start$497, t6$478, _(enqueue$202, [r$498])]);
           _(add_dep$196, [start$497, t7$479, _(enqueue$202, [r$498])]);
           return res$480;
         });
    var bind7$499 =
      _f(function (t1$500, t2$501, t3$502, t4$503, t5$504, t6$505, t7$506, f$507) {
           return __(bind7_gen$469, [connect$214, $(never$218), f$507, t1$500, t2$501, t3$502, t4$503, t5$504, t6$505, t7$506]);
         });
    var lift7$508 = _f(function (eq$509, f$510) { return __(bind7_gen$469, [write$184, eq$509, f$510]); });
    var blift7$511 =
      _f(function (t1$512, t2$513, t3$514, t4$515, t5$516, t6$517, t7$518, eq$519, f$520) {
           return __(lift7$508, [eq$519, f$520, t1$512, t2$513, t3$514, t4$515, t5$516, t6$517, t7$518]);
         });
    var bindN_gen$521 =
      _f(function (assign$522, eq$523, f$524, ts$525) {
           var res$526 = _(make$153, [0, eq$523, 0, 0]);
           var read$527 =
             _f(function (param$557) {
                  try {
                    var vs$528 =
                      _(oc$List$[10],
                      [_f(function (t$529) {
                            var match$558 = t$529[3];
                            switch ($t(match$558))
                            {
                            case 0: return match$558[0];
                            case 1: throw match$558[0];
                            default: return null;
                            }
                          }),
                      ts$525]);
                    return _(assign$522, [res$526, _(f$524, [vs$528])]);
                  } catch (e$532) {
                    return __(write_exn$187, [res$526, e$532]);
                  }
                });
           var start$533 = _(tick$151, [0]);
           _(read$527, [0]);
           var r$534 = $(read$527, start$533, _(tick$151, [0]));
           _(oc$List$[9], [_f(function (t$535) { return __(add_dep$196, [start$533, t$535, _(enqueue$202, [r$534])]); }), ts$525]);
           return res$526;
         });
    var bindN$536 = _f(function (ts$537, f$538) { return __(bindN_gen$521, [connect$214, $(never$218), f$538, ts$537]); });
    var liftN$539 = _f(function (eq$540, f$541) { return __(bindN_gen$521, [write$184, eq$540, f$541]); });
    var bliftN$542 = _f(function (ts$543, eq$544, f$545) { return __(liftN$539, [eq$544, f$545, ts$543]); });
    return $(return$165, fail$168, bind$228, bind$228, lift$232, blift$235, 
           catch$271, try_bind$251, catch_lift$274, try_bind_lift$255, 
           read$192, read_result$190, write$184, write_exn$187, write_result$172, 
           notify$209, cleanup$212, make$153, init$147, propagate$278, 
           set_exn_handler$282, set_debug$91, bind2$299, lift2$303, blift2$306, 
           bind3$329, lift3$334, blift3$337, bind4$364, lift4$370, blift4$373, 
           bind5$404, lift5$411, blift5$414, bind6$449, lift6$457, blift6$460, 
           bind7$499, lift7$508, blift7$511, bindN$536, liftN$539, bliftN$542);
  }();
var oc$Froc$ =
  function () {
    var include$185 = oc$Froc_ddg$;
    var $3E$3E$3D$62 = include$185[3];
    var write_result$74 = include$185[14];
    var notify$75 = include$185[15];
    var make$77 = include$185[17];
    var switch$109 = _f(function (bb$110) { return __($3E$3E$3D$62, [bb$110, _f(function (b$111) { return b$111; })]); });
    var make_event$112 = _f(function (param$194) { return __(make$77, [$(1), 0, 0, 0]); });
    var merge$113 =
      _f(function (ts$114) {
           var t$115 = _(make_event$112, [0]);
           _(oc$List$[9], [_f(function (t$27$116) { return __(notify$75, [t$27$116, _(write_result$74, [t$115])]); }), ts$114]);
           return t$115;
         });
    var map$117 =
      _f(function (f$118, t$119) {
           var t$27$120 = _(make_event$112, [0]);
           _(notify$75,
           [t$119,
           _f(function (r$121) {
                var r$122 =
                  function () {
                    switch ($t(r$121))
                    {
                    case 0: try { return $(_(f$118, [r$121[0]])); } catch (e$125) { return $1(e$125); }
                            break;
                    case 1: return $1(r$121[0]);
                    default: return null;
                    }
                  }();
                return __(write_result$74, [t$27$120, r$122]);
              })]);
           return t$27$120;
         });
    var filter$126 =
      _f(function (p$127, t$128) {
           var t$27$129 = _(make_event$112, [0]);
           _(notify$75,
           [t$128,
           _f(function (r$130) {
                var r$131 =
                  function () {
                    switch ($t(r$130))
                    {
                    case 0:
                      var v$132 = r$130[0];
                      try { if (_(p$127, [v$132])) return $($(v$132));
                            return 0; } catch (e$133) { return $($1(e$133)); }
                      break;
                    case 1: return $(r$130);
                    default: return null;
                    }
                  }();
                if (r$131) return __(write_result$74, [t$27$129, r$131[0]]);
                return 0;
              })]);
           return t$27$129;
         });
    var collect$135 =
      _f(function (f$136, init$137, t$138) {
           var t$27$139 = _(make_event$112, [0]);
           var s$140 = $($(init$137));
           _(notify$75,
           [t$138,
           _f(function (r$141) {
                var r$142 =
                  function () {
                    var match$190 = s$140[0];
                    switch ($t(match$190))
                    {
                    case 0:
                      switch ($t(r$141))
                      {
                      case 0:
                        try { return $($(_(f$136, [match$190[0], r$141[0]]))); } catch (e$146) { return $($1(e$146)); }
                        break;
                      default: return $($1(r$141[0]));
                      }
                      break;
                    case 1: return 0;
                    default: return null;
                    }
                  }();
                if (r$142) { var r$147 = r$142[0];
                             s$140[0] = r$147;
                             return __(write_result$74, [t$27$139, r$147]); }
                return 0;
              })]);
           return t$27$139;
         });
    var q$148 = _(oc$Queue$[1], [0]);
    var running$149 = $(0);
    var run_queue$150 =
      _f(function (param$189) {
           running$149[0] = 1;
           while (!_(oc$Queue$[10], [q$148])) { var f$151 = _(oc$Queue$[4], [q$148]);
                                                _(f$151, [0]);
                                                _(include$185[19], [0]); }
           return running$149[0] = 0;
         });
    var enqueue$152 =
      _f(function (f$153) { _(oc$Queue$[2], [f$153, q$148]);
                            if (!running$149[0]) return __(run_queue$150, [0]);
                            return 0; });
    var send_result$154 =
      _f(function (t$155, r$156) {
           return __(enqueue$152, [_f(function (param$188) { return __(write_result$74, [t$155, r$156]); })]);
         });
    var send$157 = _f(function (t$158, v$159) { return __(send_result$154, [t$158, $(v$159)]); });
    var send_exn$160 = _f(function (t$161, e$162) { return __(send_result$154, [t$161, $1(e$162)]); });
    var hold_result$163 =
      _f(function (eq$164, init$165, e$166) {
           var b$167 = _(make$77, [0, eq$164, $(init$165), 0]);
           _(notify$75, [e$166, _(write_result$74, [b$167])]);
           return b$167;
         });
    var hold$168 = _f(function (eq$169, init$170, e$171) { return __(hold_result$163, [eq$169, $(init$170), e$171]); });
    var changes$172 =
      _f(function (b$173) { var e$174 = _(make_event$112, [0]);
                            _(notify$75, [b$173, _(send_result$154, [e$174])]);
                            return e$174; });
    var when_true$175 =
      _f(function (b$176) {
           return __(map$117,
                  [_f(function (b$177) { return 0; }),
                  _(filter$126, [_f(function (b$178) { return b$178; }), _(changes$172, [b$176])])]);
         });
    var count$179 =
      _f(function (e$180) {
           return __(hold$168, [0, 0, _(collect$135, [_f(function (n$181, param$187) { return n$181 + 1; }), 0, e$180])]);
         });
    var init$182 = _f(function (param$186) { _(include$185[18], [0]);
                                             return __(oc$Queue$[8], [q$148]); });
    return $(init$182, include$185[0], include$185[1], include$185[2], 
           $3E$3E$3D$62, include$185[5], include$185[4], include$185[6], 
           include$185[8], include$185[7], include$185[9], include$185[10], 
           include$185[11], notify$75, include$185[16], make_event$112, 
           notify$75, send$157, send_exn$160, send_result$154, switch$109, 
           merge$113, map$117, filter$126, collect$135, hold$168, hold_result$163, 
           changes$172, when_true$175, count$179, include$185[40], include$185[42], 
           include$185[41], include$185[22], include$185[24], include$185[23], 
           include$185[25], include$185[27], include$185[26], include$185[28], 
           include$185[30], include$185[29], include$185[31], include$185[33], 
           include$185[32], include$185[34], include$185[36], include$185[35], 
           include$185[37], include$185[39], include$185[38], include$185[20], 
           include$185[21]);
  }();
var oc$Ocamljs$ =
  function () {
    var option_of_nullable$74 = _f(function (x$75) { if (x$75 === null) return 0;
                                                     return $(x$75); });
    var nullable_of_option$76 = _f(function (x$77) { if (x$77) return x$77[0];
                                                     return null; });
    var is_null$79 = _f(function (a$80) { return caml_equal(a$80, null); });
    var jsfun$82 = _f(function (f$83) { return function (a$84) { return caml_callback(f$83, a$84); }; });
    var jsfun2$85 = _f(function (f$86) { return function (a1$87, a2$88) { return caml_callback2(f$86, a1$87, a2$88); }; });
    var jsfun3$89 =
      _f(function (f$90) { return function (a1$91, a2$92, a3$93) { return caml_callback3(f$90, a1$91, a2$92, a3$93); }; });
    var jsfun4$94 =
      _f(function (f$95) {
           return function (a1$96, a2$97, a3$98, a4$99) { return caml_callback4(f$95, a1$96, a2$97, a3$98, a4$99); };
         });
    var jsfun5$100 =
      _f(function (f$101) {
           return function (a1$102, a2$103, a3$104, a4$105, a5$106) {
                    return caml_callback5(f$101, a1$102, a2$103, a3$104, a4$105, a5$106);
                  };
         });
    var Inline$288 = function () { var Jslib_ast$282 = $();
                                   var _loc$287 = 0;
                                   return $(Jslib_ast$282, _loc$287); }();
    return $(option_of_nullable$74, nullable_of_option$76, is_null$79, 
           jsfun$82, jsfun2$85, jsfun3$89, jsfun4$94, jsfun5$100, Inline$288);
  }();
var oc$Javascript$ =
  function () {
    var typeof$78 = _f(function (o$79) { return typeof o$79; });
    var true_$80 = true;
    var false_$81 = false;
    var new_Date$119 = _f(function (param$143) { return new Date(); });
    var Js_string$140 = $();
    var Math$142 = function () { var pi$141 = Math.PI;
                                 return $(pi$141); }();
    return $(typeof$78, true_$80, false_$81, new_Date$119, Js_string$140, Math$142);
  }();
var oc$Dom$ = function () { var window$696 = window;
                            var document$697 = document;
                            return $(window$696, document$697); }();
var oc$Froc_dom$ =
  function () {
    var $7C$3E$58 = _f(function (x$59, f$60) { return __(f$60, [x$59]); });
    var ticks_b$63 =
      _f(function (msb$64) {
           var e$65 = _(oc$Froc$[15], [0]);
           var id$66 = $(0);
           var clear$67 =
             _f(function (param$175) {
                  var match$176 = id$66[0];
                  if (match$176)
                  {
                    (function () { var v$185 = oc$Dom$[0];
                                   return _m(v$185.clearInterval, v$185, [match$176[0]]); }());
                    return id$66[0] = 0;
                  }
                  return 0;
                });
           var set_interval$69 =
             _f(function (r$70) {
                  _(clear$67, [0]);
                  switch ($t(r$70))
                  {
                  case 0:
                    return id$66[0] =
                           $(function () {
                               var v$184 = oc$Dom$[0];
                               return _m(v$184.setInterval, v$184,
                                      [_(oc$Ocamljs$[3], [_f(function (param$173) { return __(oc$Froc$[17], [e$65, 0]); })]),
                                      r$70[0]]);
                             }());
                  case 1: return 0;
                  default: return null;
                  }
                });
           _(set_interval$69, [_(oc$Froc$[12], [msb$64])]);
           _(oc$Froc$[14], [clear$67]);
           _(oc$Froc$[13], [msb$64, set_interval$69]);
           return e$65;
         });
    var ticks$72 =
      _f(function (ms$73) {
           var e$74 = _(oc$Froc$[15], [0]);
           var id$75 =
             function () {
               var v$183 = oc$Dom$[0];
               return _m(v$183.setInterval, v$183,
                      [_(oc$Ocamljs$[3], [_f(function (param$172) { return __(oc$Froc$[17], [e$74, 0]); })]), ms$73]);
             }();
           _(oc$Froc$[14],
           [_f(function (param$171) {
                 return function () { var v$182 = oc$Dom$[0];
                                      return __m(v$182.clearInterval, v$182, [id$75]); }();
               })]);
           return e$74;
         });
    var send_delayed_event$85 =
      _f(function (e$86, de$87) {
           var send$88 =
             _f(function (de$89) {
                  if (!(de$89[1] === de$89))
                  {
                    _(oc$Froc$[19], [e$86, de$89[0]]);
                    var de_next$90 = de$89[1];
                    de$89[1] = de$89;
                    return __(send$88, [de_next$90]);
                  }
                  return 0;
                });
           return __(send$88, [de$87]);
         });
    var delay_eb$91 =
      _f(function (t$92, msb$93) {
           var e$94 = _(oc$Froc$[15], [0]);
           var de$95 = $($1($(oc$Pervasives$[2])), de$95);
           de$95[1] = de$95;
           var de_next$96 = $(de$95);
           _(oc$Froc$[16],
           [t$92,
           _f(function (r$97) {
                var r$98 = _(oc$Froc$[12], [msb$93]);
                switch ($t(r$98))
                {
                case 0:
                  var de$100 = $(r$97, de_next$96[0]);
                  de_next$96[0] = de$100;
                  (function () {
                     var v$181 = oc$Dom$[0];
                     return _m(v$181.setTimeout, v$181,
                            [_(oc$Ocamljs$[3], [_f(function (param$167) { return __(send_delayed_event$85, [e$94, de$100]); })]),
                            r$98[0]]);
                   }());
                  return 0;
                case 1: de_next$96[0] = $(r$98, de_next$96[0]);
                        return __(send_delayed_event$85, [e$94, de_next$96[0]]);
                default: return null;
                }
              })]);
           return e$94;
         });
    var delay_e$101 = _f(function (t$102, ms$103) { return __(delay_eb$91, [t$102, _(oc$Froc$[1], [0, ms$103])]); });
    var delay_bb$104 =
      _f(function (t$105, msb$106) {
           return __($7C$3E$58,
                  [_($7C$3E$58,
                   [_($7C$3E$58, [t$105, oc$Froc$[27]]), _f(function (e$107) { return __(delay_eb$91, [e$107, msb$106]); })]),
                  _(oc$Froc$[26], [0, _(oc$Froc$[12], [t$105])])]);
         });
    var delay_b$108 = _f(function (t$109, ms$110) { return __(delay_bb$104, [t$109, _(oc$Froc$[1], [0, ms$110])]); });
    var mouse_e$111 =
      _f(function (param$164) {
           var e$112 = _(oc$Froc$[15], [0]);
           var f$113 =
             _(oc$Ocamljs$[3], [_f(function (me$114) { return __(oc$Froc$[17], [e$112, $(me$114.clientX, me$114.clientY)]); })]);
           (function () { var v$180 = oc$Dom$[1];
                          return _m(v$180.addEventListener, v$180, ["mousemove", f$113, 0]); }());
           _(oc$Froc$[14],
           [_f(function (param$165) {
                 return function () { var v$179 = oc$Dom$[1];
                                      return __m(v$179.addEventListener, v$179, ["mousemove", f$113, 0]); }();
               })]);
           return e$112;
         });
    var mouse_b$115 = _f(function (param$163) { return __(oc$Froc$[25], [0, $(0, 0), _(mouse_e$111, [0])]); });
    var attach_innerHTML$116 =
      _f(function (elem$117, b$118) {
           var e$119 = _(oc$Froc$[27], [b$118]);
           return __(oc$Froc$[16],
                  [e$119,
                  _f(function (param$162) {
                       switch ($t(param$162)) { case 0: return elem$117.innerHTML = param$162[0]; default: return 0; }
                     })]);
         });
    var input_value_e$121 =
      _f(function (input$122) {
           var e$123 = _(oc$Froc$[15], [0]);
           var f$124 = _(oc$Ocamljs$[3], [_f(function (param$161) { return __(oc$Froc$[17], [e$123, input$122.value]); })]);
           _m(input$122.addEventListener, input$122, ["change", f$124, 0]);
           _(oc$Froc$[14], [_f(function (param$160) { return __m(input$122.addEventListener, input$122, ["change", f$124, 0]); })]);
           return e$123;
         });
    var input_value_b$125 =
      _f(function (input$126) { return __(oc$Froc$[25], [0, input$126.value, _(input_value_e$121, [input$126])]); });
    var node_of_result$127 =
      _f(function (param$159) {
           switch ($t(param$159))
           {
           case 0: return param$159[0];
           case 1:
             var s$130 = function () { var v$178 = oc$Dom$[1];
                                       return _m(v$178.createElement, v$178, ["span"]); }();
             var t$131 = function () { var v$177 = oc$Dom$[1];
                                       return _m(v$177.createTextNode, v$177, ["exception"]); }();
             _m(s$130.appendChild, s$130, [t$131]);
             ;
             return s$130;
           default: return null;
           }
         });
    var appendChild$132 =
      _f(function (n$133, nb$134) {
           var old$136 = $(0);
           var update$137 =
             _f(function (r$138) {
                  var c$139 = _(node_of_result$127, [r$138]);
                  var match$158 = old$136[0];
                  if (match$158) _m(n$133.replaceChild, n$133, [c$139, match$158[0]]); else _m(n$133.appendChild, n$133, [c$139]);
                  ;
                  return old$136[0] = $(c$139);
                });
           _(update$137, [_(oc$Froc$[12], [nb$134])]);
           return __(oc$Froc$[13], [nb$134, update$137]);
         });
    var replaceNode$141 =
      _f(function (n$142, nb$143) {
           var p$145 = n$142.parentNode;
           var old$146 = $(n$142);
           var update$147 =
             _f(function (r$148) {
                  var c$149 = _(node_of_result$127, [r$148]);
                  _m(p$145.replaceChild, p$145, [c$149, old$146[0]]);
                  ;
                  return old$146[0] = c$149;
                });
           _(update$147, [_(oc$Froc$[12], [nb$143])]);
           return __(oc$Froc$[13], [nb$143, update$147]);
         });
    var clicks$150 =
      _f(function (elem$151) {
           var e$152 = _(oc$Froc$[15], [0]);
           var f$153 =
             _(oc$Ocamljs$[3],
             [_f(function (ev$154) { _m(ev$154.preventDefault, ev$154, []);
                                     return __(oc$Froc$[17], [e$152, 0]); })]);
           _m(elem$151.addEventListener, elem$151, ["click", f$153, 0]);
           _(oc$Froc$[14], [_f(function (param$157) { return __m(elem$151.removeEventListener, elem$151, ["click", f$153, 0]); })]);
           return e$152;
         });
    return $(ticks$72, ticks_b$63, delay_e$101, delay_eb$91, delay_b$108, 
           delay_bb$104, mouse_e$111, mouse_b$115, attach_innerHTML$116, 
           input_value_e$121, input_value_b$125, appendChild$132, replaceNode$141, 
           clicks$150);
  }();
var oc$Clicks$ =
  function () {
    var D$58 = oc$Dom$;
    var F$59 = oc$Froc$;
    var Fd$60 = oc$Froc_dom$;
    var $3E$3E$3D$61 = F$59[4];
    var onload$62 =
      _f(function (param$251) {
           var clicks$63 =
             _(F$59[29],
             [_(Fd$60[13], [function () { var v$255 = D$58[1];
                                          return _m(v$255.getElementById, v$255, ["click"]); }()])]);
           var ticks$64 = _(F$59[29], [_(Fd$60[0], [1000.])]);
           _(Fd$60[8],
           [function () { var v$254 = D$58[1];
                          return _m(v$254.getElementById, v$254, ["clicks"]); }(),
           _($3E$3E$3D$61, [clicks$63, _f(function (c$65) { return __(F$59[1], [0, _(oc$Pervasives$[19], [c$65])]); })])]);
           _(Fd$60[8],
           [function () { var v$253 = D$58[1];
                          return _m(v$253.getElementById, v$253, ["seconds"]); }(),
           _($3E$3E$3D$61, [ticks$64, _f(function (s$66) { return __(F$59[1], [0, _(oc$Pervasives$[19], [s$66])]); })])]);
           return __(Fd$60[8],
                  [function () { var v$252 = D$58[1];
                                 return _m(v$252.getElementById, v$252, ["difference"]); }(),
                  _(F$59[33],
                  [clicks$63, ticks$64,
                  _f(function (clicks$67, ticks$68) {
                       var s$69 =
                         clicks$67 === ticks$68 ? "same number of clicks as ticks" :
                         clicks$67 > ticks$68 ?
                         _(oc$Pervasives$[15], [_(oc$Pervasives$[19], [clicks$67 - ticks$68]), " more clicks than ticks"]) :
                         _(oc$Pervasives$[15], [_(oc$Pervasives$[19], [ticks$68 - clicks$67]), " more ticks than clicks"]);
                       return __(F$59[1], [0, s$69]);
                     })])]);
         });
    (D$58[0]).onload = _(oc$Ocamljs$[3], [onload$62]);
    return $(D$58, F$59, Fd$60, $3E$3E$3D$61, onload$62);
  }();
var oc$Std_exit$ = (_(oc$Pervasives$[80], [0]), $());
return caml_named_value;
})();
