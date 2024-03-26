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
│       │   ├── decoder_3_to_8-buggy_num.v
│       │   ├── decoder_3_to_8-buggy_var.v
│       │   ├── decoder_3_to_8-kgoliya_buggy1.v
│       │   ├── decoder_3_to_8-super_buggy.v
│       │   ├── decoder_3_to_8-wadden_buggy1.v
│       │   ├── decoder_3_to_8-wadden_buggy2.v
│       │   ├── first_counter_overflow-buggy.v
│       │   ├── first_counter_overflow-buggy_all.v
│       │   ├── first_counter_overflow-buggy_counter.v
│       │   ├── first_counter_overflow-kgoliya_buggy1.v
│       │   ├── first_counter_overflow-wadden_buggy1.v
│       │   ├── first_counter_overflow-wadden_buggy2.v
│       │   ├── fsm_full-buggy_num.v
│       │   ├── fsm_full-buggy_var.v
│       │   ├── fsm_full-ssscrazy_buggy1.v
│       │   ├── fsm_full-super_buggy.v
│       │   ├── fsm_full-wadden_buggy1.v
│       │   ├── fsm_full-wadden_buggy2.v
│       │   ├── lshift_reg-buggy_num.v
│       │   ├── lshift_reg-buggy_var.v
│       │   ├── lshift_reg-kgoliya_buggy1.v
│       │   ├── lshift_reg-wadden_buggy1.v
│       │   ├── lshift_reg-wadden_buggy2.v
│       │   ├── mux_4_1-buggy_var.v
│       │   ├── mux_4_1-kgoliya_buggy1.v
│       │   ├── mux_4_1-wadden_buggy1.v
│       │   ├── mux_4_1-wadden_buggy2.v
│       │   ├── tff-wadden_buggy1.v
│       │   └── tff-wadden_buggy2.v
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
    │   ├── decoder_3_to_8
    │   │   ├── decoder_3_to_8.v
    │   │   ├── decoder_3_to_8_tb_t1.v
    │   │   ├── oracle.txt
    │   │   ├── output.txt
    │   │   ├── run.sh
    │   │   ├── simv
    │   │   ├── sys_defs.vh
    │   │   ├── tokens.v
    │   │   ├── ucli.key
    │   │   └── vcs_sim_command
    │   ├── first_counter_overflow
    │   │   ├── first_counter_overflow.v
    │   │   ├── first_counter_tb_t2.v
    │   │   ├── first_counter_tb_t3.v
    │   │   ├── oracle.txt
    │   │   ├── run.sh
    │   │   ├── simv
    │   │   ├── sys_defs.vh
    │   │   ├── test_first_counter.v
    │   │   ├── tokens.v
    │   │   ├── ucli.key
    │   │   └── vcs_sim_command
    │   ├── fsm_full
    │   │   ├── fsm_full.v
    │   │   ├── fsm_full_tb.v
    │   │   ├── fsm_full_tb_t1.v
    │   │   ├── fuzzed_input.txt
    │   │   ├── fuzzed_output.txt
    │   │   ├── oracle.txt
    │   │   ├── output.txt
    │   │   ├── run.sh
    │   │   ├── simv
    │   │   ├── super_buggy_output.txt
    │   │   ├── sys_defs.vh
    │   │   ├── tokens.v
    │   │   ├── vcs_sim_command
    │   │   └── vcs_sim_command_buggy
    │   ├── lshift_reg
    │   │   ├── lshift_reg.v
    │   │   ├── lshift_reg_tb.v
    │   │   ├── lshift_reg_tb_t1.v
    │   │   ├── oracle.txt
    │   │   ├── run.sh
    │   │   ├── simv
    │   │   └── vcs_sim_command
    │   ├── mux_4_1
    │   │   ├── mux_4_1.v
    │   │   ├── oracle.txt
    │   │   ├── output_mux_4_1_tb.txt
    │   │   ├── run.sh
    │   │   ├── simv
    │   │   ├── ucli.key
    │   │   ├── vcs_sim_command
    │   ├── opencores
    │   ├── sdram_controller
    │   └── tff
    │       ├── oracle.txt
    │       ├── output.txt
    │       ├── run.sh
    │       ├── simv
    │       ├── sys_defs.vh
    │       ├── tff.v
    │       ├── tff_tb.v
    │       ├── ucli.key
    │       └── vcs_sim_command
    ├── process.py
    ├── prototype
    │   ├── README.md
    │   ├── __init__.py
    │   ├── bit_weighting.py
    │   ├── experiments_results.xlsx
    │   ├── fitness.py
    │   ├── fuzz_testing.sh
    │   ├── fuzz_weighting.py
    │   ├── gen_fitness_graph.py
    │   ├── run_prototype.sh
    │   └── sys_defs.vh
    ├── pyverilog_changes
    │   ├── README.md
    │   ├── __init__.py
    │   ├── ast.py
    │   ├── ast_classes.txt
    │   ├── codegen.py
    │   └── parser.py
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