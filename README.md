# File structure
## Backend
- web backend app with django
## frontend
- nextjs app with code mirror
## verilog_repair
- modified cirfix project wrapped as a microservice 



```angular2html
.
├── README.md
├── docker-compose.yml
├── backend
│   ├── README.md
│   ├── app
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── migrations
│   │   │   ├── 0001_initial.py
│   │   │   └── __init__.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── utils
│   │   │   ├── __init__.py
│   │   │   ├── authentication.py
│   │   │   └── problems.py
│   │   └── views.py
│   ├── db.sqlite3
│   ├── manage.py
│   ├── postgres
│   ├── requirements.txt
│   ├── src
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── static
│       ├── buggy_verilog_codes
│       └── consent_form.txt
├── frontend
│   ├── app
│   │   ├── _app.tsx
│   │   ├── done
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── favicon.ico
│   │   ├── home
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── login
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── register
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── components
│   │   ├── Editor.tsx
│   │   ├── consentForm.tsx
│   │   ├── loginForm.tsx
│   │   └── use-codemirror.tsx
│   ├── next-env.d.ts
│   ├── next.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── flip_flop1.png
│   ├── styles
│   │   ├── Home.module.css
│   │   └── globals.css
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── yarn.lock
└── verilog_repair
    ├── DockerFile
    ├── LICENSE
    ├── Makefile
    ├── README.md
    ├── __init__.py
    ├── benchmarks
    ├── process.py
    ├── prototype
    ├── pyverilog_changes
    ├── requirements.txt
    ├── src
    │   ├── __init__.py
    │   ├── config.py
    │   ├── main.py
    │   └── posts
    │       ├── __init__.py
    │       └── router.py
    └── tests
        └── test_cirfix.py


```