import serialize from "@/serializer";

test("serializes undefined", () => {
  const input = undefined;
  const expected = JSON.stringify(input);

  expect(serialize(input)).toBe(expected);
});

test("serializes null", () => {
  const input = null;
  const expected = JSON.stringify(input);

  expect(serialize(input)).toBe(expected);
});

test("serializes array", () => {
  const input = [] as never[];
  const expected = JSON.stringify(input);

  expect(serialize(input)).toBe(expected);
});

test("serializes an empty object", () => {
  const input = {};
  const expected = "{}";

  expect(serialize(input)).toBe(expected);
});

test("serializes a flat object", () => {
  const input = { a: true, b: 2, c: "three" };
  const expected = '{a:4,b:1,c:7,true2"three"}';

  expect(serialize(input)).toBe(expected);
});

test("serializes a nested object", () => {
  const input = {
    a: true,
    b: [true, 2, "three"],
    c: { d: { e: "f", g: { h: ["i"] } } },
  };
  const expected =
    '{a:4,b:16,c:32,true[true,2,"three"]{d:25,{e:3,g:11,"f"{h:5,["i"]}}}}';

  expect(serialize(input)).toBe(expected);
});
