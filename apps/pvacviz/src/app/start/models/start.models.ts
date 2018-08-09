import { Boxed, box } from 'ngrx-forms';

export interface StartFormGroup {
  'input': string;
  'samplename': string;
  'alleles': Boxed<string[]>;
  'prediction_algorithms': Boxed<string[]>;
  'epitope_lengths': Boxed<number[]>;
  'peptide_sequence_length': number;
  'net_chop_method': string;
  'net_chop_threshold': number;
  'netmhc_stab': boolean;
  'top_score_metric': string;
  'binding_threshold': number;
  'allele_specific_cutoffs': boolean;
  'minimum_fold_change': number;
  'expn_val': number;
  'normal_cov': number;
  'tdna_cov': number;
  'trna_cov': number;
  'normal_vaf': number;
  'tdna_vaf': number;
  'trna_vaf': number;
  'fasta_size': number;
  'iedb_retries': number;
  'downstream_sequence_length': number;
  'iedb_install_dir': string;
  'keep_tmp_files': boolean;
  'force': boolean;
}
export const StartFormGroupInitialState = {
  'input': null,
  'samplename': '',
  'alleles': box([]),
  'prediction_algorithms': box([]),
  'epitope_lengths': box([10]),
  'peptide_sequence_length': 21,
  'net_chop_method': '',
  'net_chop_threshold': 0.5,
  'netmhc_stab': false,
  'top_score_metric': 'median',
  'binding_threshold': 500,
  'allele_specific_cutoffs': false,
  'minimum_fold_change': 0,
  'expn_val': 1,
  'normal_cov': 5,
  'tdna_cov': 5,
  'trna_cov': 5,
  'normal_vaf': 5,
  'tdna_vaf': 5,
  'trna_vaf': 5,
  'fasta_size': 200,
  'iedb_retries': 5,
  'downstream_sequence_length': 1000,
  'iedb_install_dir': '',
  'keep_tmp_files': false,
  'force': false,
}
