export interface Parameters {
  // required
  readonly id: number;
  readonly input: string;
  readonly action: string;
  readonly samplename: string;
  readonly alleles: Array<string>;
  readonly prediction_algorithms: Array<string>;

  // optional
  readonly binding_threshold?: number;
  readonly downstream_sequence_length?: number;
  readonly epitope_lengths?: Array<number>;
  readonly expn_val?: number;
  readonly fasta_size?: number;
  readonly iedb_install_dir?: string;
  readonly iedb_retries?: number;
  readonly keep_tmp_files?: boolean;
  readonly allele_specific_cutoffs?: boolean;
  readonly minimum_fold_change?: number;
  readonly net_chop_method?: string;
  readonly netchop_threshold?: number;
  readonly netmhc_stab?: number;
  readonly normal_cov?: number;
  readonly normal_vaf?: number;
  readonly output?: string;
  readonly peptide_sequence_length?: number;
  readonly tdna_cov?: number;
  readonly tdna_vaf?: number;
  readonly top_score_metric?: string;
  readonly trna_cov?: number;
  readonly trna_vaf?: number;
}
