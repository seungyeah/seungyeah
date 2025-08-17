---
title: "Rust 컬렉션: 벡터, 문자열, 해시맵"
date: 2024-01-11
draft: false
tags: ["rust", "programming", "collections"]
series: ["Rust 완벽 가이드"]
description: "Rust의 주요 컬렉션 타입들을 배워봅니다."
toc: true
---

## 벡터 (Vector)

벡터는 같은 타입의 값들을 저장하는 가변 크기 배열입니다.

```rust
let mut v = Vec::new();
v.push(5);
v.push(6);
v.push(7);

// 또는 vec! 매크로 사용
let v = vec![1, 2, 3];
```

## 문자열 (String)

Rust에는 두 가지 주요 문자열 타입이 있습니다.

```rust
let mut s = String::new();
s.push_str("hello");
s.push(' ');
s.push('w');

let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1 + &s2; // s1은 더 이상 사용할 수 없음
```

## 해시맵 (HashMap)

키-값 쌍을 저장하는 컬렉션입니다.

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

let team_name = String::from("Blue");
let score = scores.get(&team_name);
```
