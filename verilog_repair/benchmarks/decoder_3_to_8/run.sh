cur_dir=`pwd`

touch $3"vcs_sim_command_buggy_$5"

echo $3

sed "s|INPUT|$2|g;s|PATH|$3|g;s|PID|$5|g" $3"vcs_sim_command" > $3"vcs_sim_command_buggy_$5"

cd $3

cat $3vcs_sim_command_buggy_$5
`. $3vcs_sim_command_buggy_$5`

cp "$3"output_decoder_3_to_8_tb_t1.txt $4
rm "$3"output_decoder_3_to_8_tb_t1.txt

cd $cur_dir

