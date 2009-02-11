type 'a t

val return : ?eq:('a -> 'a -> bool) -> 'a -> 'a t
val fail : exn -> 'a t

val bind : 'a t -> ('a -> 'b t) -> 'b t
val (>>=) : 'a t -> ('a -> 'b t) -> 'b t
val lift : ?eq:('b -> 'b -> bool) -> ('a -> 'b) -> 'a t -> 'b t
val blift : 'a t -> ?eq:('b -> 'b -> bool) -> ('a -> 'b) -> 'b t

val catch : (unit -> 'a t) -> (exn -> 'a t) -> 'a t
val try_bind : (unit -> 'a t) -> ('a -> 'b t) -> (exn -> 'b t) -> 'b t
val catch_lift : (unit -> 'a t) -> ?eq:('a -> 'a -> bool) -> (exn -> 'a) -> 'a t
val try_bind_lift : (unit -> 'a t) -> ?eq:('b -> 'b -> bool) -> ('a -> 'b) -> (exn -> 'b) -> 'b t

val read : 'a t -> 'a
val write : 'a t -> 'a -> unit
val write_exn : 'a t -> exn -> unit
val init : unit -> unit
val propagate : unit -> unit

val set_debug : (string -> unit) -> unit

val bind2 :
  'a1 t -> 'a2 t ->
  ('a1 -> 'a2 -> 'b t) ->
  'b t
val lift2 :
  ?eq:('b -> 'b -> bool) ->
  ('a1 -> 'a2 -> 'b) ->
  'a1 t -> 'a2 t ->
  'b t
val blift2 :
  'a1 t -> 'a2 t ->
  ?eq:('b -> 'b -> bool) ->
  ('a1 -> 'a2 -> 'b) ->
  'b t

val bind3 :
  'a1 t -> 'a2 t -> 'a3 t ->
  ('a1 -> 'a2 -> 'a3 -> 'b t) ->
  'b t
val lift3 :
  ?eq:('b -> 'b -> bool) ->
  ('a1 -> 'a2 -> 'a3 -> 'b) ->
  'a1 t -> 'a2 t -> 'a3 t ->
  'b t
val blift3 :
  'a1 t -> 'a2 t -> 'a3 t ->
  ?eq:('b -> 'b -> bool) ->
  ('a1 -> 'a2 -> 'a3 -> 'b) ->
  'b t

val bind4 :
  'a1 t -> 'a2 t -> 'a3 t -> 'a4 t ->
  ('a1 -> 'a2 -> 'a3 -> 'a4 -> 'b t) ->
  'b t
val lift4 :
  ?eq:('b -> 'b -> bool) ->
  ('a1 -> 'a2 -> 'a3 -> 'a4 -> 'b) ->
  'a1 t -> 'a2 t -> 'a3 t -> 'a4 t ->
  'b t
val blift4 :
  'a1 t -> 'a2 t -> 'a3 t -> 'a4 t ->
  ?eq:('b -> 'b -> bool) ->
  ('a1 -> 'a2 -> 'a3 -> 'a4 -> 'b) ->
  'b t

val bind5 :
  'a1 t -> 'a2 t -> 'a3 t -> 'a4 t -> 'a5 t ->
  ('a1 -> 'a2 -> 'a3 -> 'a4 -> 'a5 -> 'b t) ->
  'b t
val lift5 :
  ?eq:('b -> 'b -> bool) ->
  ('a1 -> 'a2 -> 'a3 -> 'a4 -> 'a5 -> 'b) ->
  'a1 t -> 'a2 t -> 'a3 t -> 'a4 t -> 'a5 t ->
  'b t
val blift5 :
  'a1 t -> 'a2 t -> 'a3 t -> 'a4 t -> 'a5 t ->
  ?eq:('b -> 'b -> bool) ->
  ('a1 -> 'a2 -> 'a3 -> 'a4 -> 'a5 -> 'b) ->
  'b t

val bind6 :
  'a1 t -> 'a2 t -> 'a3 t -> 'a4 t -> 'a5 t -> 'a6 t ->
  ('a1 -> 'a2 -> 'a3 -> 'a4 -> 'a5 -> 'a6 -> 'b t) ->
  'b t
val lift6 :
  ?eq:('b -> 'b -> bool) ->
  ('a1 -> 'a2 -> 'a3 -> 'a4 -> 'a5 -> 'a6 -> 'b) ->
  'a1 t -> 'a2 t -> 'a3 t -> 'a4 t -> 'a5 t -> 'a6 t ->
  'b t
val blift6 :
  'a1 t -> 'a2 t -> 'a3 t -> 'a4 t -> 'a5 t -> 'a6 t ->
  ?eq:('b -> 'b -> bool) ->
  ('a1 -> 'a2 -> 'a3 -> 'a4 -> 'a5 -> 'a6 -> 'b) ->
  'b t

val bind7 :
  'a1 t -> 'a2 t -> 'a3 t -> 'a4 t -> 'a5 t -> 'a6 t -> 'a7 t ->
  ('a1 -> 'a2 -> 'a3 -> 'a4 -> 'a5 -> 'a6 -> 'a7 -> 'b t) ->
  'b t
val lift7 :
  ?eq:('b -> 'b -> bool) ->
  ('a1 -> 'a2 -> 'a3 -> 'a4 -> 'a5 -> 'a6 -> 'a7 -> 'b) ->
  'a1 t -> 'a2 t -> 'a3 t -> 'a4 t -> 'a5 t -> 'a6 t -> 'a7 t ->
  'b t
val blift7 :
  'a1 t -> 'a2 t -> 'a3 t -> 'a4 t -> 'a5 t -> 'a6 t -> 'a7 t ->
  ?eq:('b -> 'b -> bool) ->
  ('a1 -> 'a2 -> 'a3 -> 'a4 -> 'a5 -> 'a6 -> 'a7 -> 'b) ->
  'b t