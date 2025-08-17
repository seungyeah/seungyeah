---
title: "Rust 에러 처리"
date: 2024-01-08
draft: false
tags: ["rust", "programming", "error-handling"]
series: ["Rust 완벽 가이드"]
description: "Rust의 에러 처리 방법을 배워봅니다."
toc: true
---

## panic!과 복구 불가능한 에러

프로그램이 복구할 수 없는 상태에 도달했을 때 `panic!` 매크로를 사용합니다.

```rust
fn main() {
    panic!("crash and burn");
}
```

## Result를 이용한 복구 가능한 에러

대부분의 에러는 복구 가능하며, `Result<T, E>` 열거형을 사용합니다.

```rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt");
    
    let f = match f {
        Ok(file) => file,
        Err(error) => {
            panic!("파일을 열 수 없습니다: {:?}", error)
        },
    };
}
```

## ? 연산자

`?` 연산자를 사용하면 에러 처리를 간단하게 할 수 있습니다.

```rust
use std::fs::File;
use std::io::Read;
use std::io;

fn read_username_from_file() -> Result<String, io::Error> {
    let mut f = File::open("hello.txt")?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}
```
