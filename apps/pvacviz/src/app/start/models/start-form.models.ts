import { Boxed, box, unbox, validate, updateGroup } from 'ngrx-forms';
import { required, minLength } from 'ngrx-forms/validation';

export interface StartFormGroupValue {
  'input': string;
  'phased_proximal_variants_vcf': string;
  'samplename': string;
  'alleles': Boxed<string[]>;
  'prediction_algorithms': Boxed<string[]>;
  'epitope_lengths': Boxed<string[]>;
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
