---
title: "Rust 참조와 차용"
date: 2024-01-05
draft: false
tags: ["rust", "programming", "borrowing"]
series: ["Rust 완벽 가이드"]
description: "Rust의 참조와 차용 시스템을 배워봅니다."
toc: true
---

## 참조란?

참조(Reference)는 값을 소유하지 않고 해당 값을 가리키는 방법입니다.

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

## 가변 참조

값을 변경하려면 가변 참조를 사용해야 합니다.

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

## 참조 규칙

1. 어느 시점에서든 하나의 가변 참조 또는 여러 개의 불변 참조를 가질 수 있습니다.
2. 참조는 항상 유효해야 합니다.
